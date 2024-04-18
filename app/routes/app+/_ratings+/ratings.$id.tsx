import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { validateCookie } from '@helpers/cookies';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import QuestionnaireCard from '@ui/cards/questionnaire';

type Questions = {
  [key: string]: IResponse[];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const ratingQuery = await RMSservice(token)
    .ratings.one({
      id,
    })
    .then((res) => {
      const { rating, error } = res || {};
      const { responses, ...rest } = rating || {};

      return { rating: rest, error, responses: responses as any as Questions };
    });

  return json({ ratingQuery });
};

export default function Rating() {
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [questions] = useState<Questions>(ratingQuery?.responses ? JSON.parse(ratingQuery?.responses as any) : {});
  const [activeQuestions, setActiveQuestions] = useState<IResponse[]>([]);

  const onChangeQuestion = (question: string) => {
    const questionQuestions = questions[question as keyof typeof questions];
    setActiveQuestions(questionQuestions);
  };

  useEffect(() => {
    const firstHeader = Object.keys(questions || {})[0];
    const firstQuestions = questions[firstHeader as keyof typeof questions];
    setActiveQuestions(firstQuestions);
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full gap-2">
      <div className="flex items-center justify-between ">
        <h3>
          <span className="font-bold uppercase">{ratingQuery?.rating?.clientModel?.companyName}</span>
          {'  - '}
          {ratingQuery?.rating?.ratingTitle}
        </h3>

        <button className="px-2 text-sm btn btn-secondary btn-sm">Confirm Questionnaire</button>
      </div>

      <QuestionnaireCard
        isReadOnly={true}
        questions={questions}
        activeQuestions={activeQuestions}
        onChangeQuestion={onChangeQuestion}
      />
    </div>
  );
}
