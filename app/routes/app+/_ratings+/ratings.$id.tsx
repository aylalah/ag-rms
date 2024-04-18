import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { validateCookie } from '@helpers/cookies';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import QuestionnaireCard from '@ui/cards/questionnaire';

interface IResponse {
  Header: string;
  Response?: {
    file: string | null;
    text: string | null;
  };
  Question: string;
}

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
      const allResponses = responses as any as IResponse[];

      //group responses by Header into IResponse
      const groupedResponses = allResponses.reduce((acc: any, response: any) => {
        const { Header } = response || {};
        if (!acc[Header as keyof typeof acc]) acc[Header] = [];
        acc[Header as keyof typeof acc].push(response);
        return acc;
      }, {}) as { [key: string]: IResponse[] };

      return { rating: rest, error, responses: groupedResponses };
    });

  return json({ ratingQuery });
};

export default function Rating() {
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [questions] = useState<(typeof ratingQuery)['responses']>(ratingQuery?.responses);
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
    <div className="flex flex-col flex-1 h-full">
      <QuestionnaireCard
        isReadOnly={true}
        questions={questions}
        activeQuestions={activeQuestions}
        onChangeQuestion={onChangeQuestion}
      />
    </div>
  );
}
