import axios from 'axios';
import RMSservice from '@modules/services';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const { rating, error } = await RMSservice(token)
    .ratings.one({ id, include: { ratingClassModel: true, methodologyModel: true, questionnaireModel: true } })
    .then((res) => ({ ...res }));

  const questions = await axios
    .get(`${rating?.questionnaireModel?.url}`)
    .then((res) => res.data as { Header: string; Questions: string; SubQuestions: string }[]);

  const block = questions.map((question) => {
    const { Header, Questions, SubQuestions } = question;
    const response = rating?.responses?.find((response) => response.question === Questions);
    return { Header, Questions, SubQuestions, response };
  });

  //group by headers, then group by questions and sub-questions

  console.log(block);

  return json({ rating, error });
};

export default function Rating() {
  const { rating, error } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col flex-1 h-full gap-4">
      <header className="">
        <h1 className="text-2xl font-bold">{rating?.ratingTitle}</h1>
      </header>

      <div className="flex flex-1 h-full gap-4">
        <div className="flex-1 bg-base-100"></div>

        <div className="w-[20em] flex flex-col gap-4 ">
          <div className="p-4 bg-base-100">
            <div className="flex justify-between flex-1 py-3 border-b">
              <h1 className="font-bold">Summary</h1>
              <span className={`${rating?.status}`}>{rating?.status}</span>
            </div>

            <div className="py-4">
              <h2 className="text-lg font-bold">Rating</h2>
              <p className="text-2xl font-bold">4.5</p>
            </div>
          </div>

          <div className="p-4 bg-base-100">
            <div className="flex-1 py-3 border-b">
              <h1 className="font-bold">Resources</h1>
            </div>

            <ul className="py-4">
              <li>
                <a href={`${rating?.methodologyModel?.id}`} className=" link-secondary">
                  Methodology
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
