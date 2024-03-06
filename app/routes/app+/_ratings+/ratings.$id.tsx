import axios from 'axios';
import dayjs from 'dayjs';
import RatingsSummaryCard from '@ui/cards/rating-summary-card';
import RMSservice from '@modules/services';
import { Accordion, Avatar } from '@components';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

interface IResponse {
  response: string;
  Questions: string;
  SubQuestions: string;
  Header: string;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);

  const ratingQuery = await RMSservice(token)
    .ratings.one({
      id,
      include: { ratingClassModel: true, methodologyModel: true, questionnaireModel: true, clientModel: true },
    })
    .then((res) => {
      const { rating, error } = res || {};
      const { responses, ...rest } = rating || {};
      const allResponses = responses as any;

      //group responses by Header into IResponse
      const groupedResponses = allResponses.reduce((acc: any, response: any) => {
        const { Header } = response;
        if (!acc[Header]) acc[Header] = [];

        acc[Header].push(response);
        return acc;
      }, {});

      return { rating: rest, error, responses: groupedResponses };
    });

  return json({ ratingQuery });
};

export default function Rating() {
  const { ratingQuery } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <header className="">
        <h1 className="text-xl font-bold">{ratingQuery?.rating?.clientModel?.companyName}</h1>
        <p className="font-normal opacity-70">{ratingQuery?.rating?.ratingTitle}</p>
      </header>

      <div className="flex flex-1 h-full gap-4 ">
        <div className="flex-1 h-[90%] pb-10 overflow-auto bg-base-200">
          {Object.keys(ratingQuery?.responses).map((response, i) => (
            <Accordion key={i} title={response} data={ratingQuery?.responses[response]} defaultChecked={i === 0} />
          ))}
        </div>

        <div className="w-[20em] flex flex-col gap-4 ">
          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex justify-between flex-1 py-3 border-b">
              <h1 className="font-bold">Summary</h1>
              <span className={`${ratingQuery?.rating?.status} capitalize`}>{ratingQuery?.rating?.status}</span>
            </div>

            <RatingsSummaryCard title="Rating Class" subTitle={ratingQuery?.rating?.ratingClassModel?.name || '-'} />

            <RatingsSummaryCard
              title="Issue Date"
              subTitle={
                !ratingQuery?.rating?.issueDate ? '-' : dayjs(ratingQuery?.rating?.issueDate).format('MMMM DD, YYYY')
              }
            />

            <RatingsSummaryCard
              title="Expiry Date"
              subTitle={
                !ratingQuery?.rating?.expiryDate ? '-' : dayjs(ratingQuery?.rating?.expiryDate).format('MMMM DD, YYYY')
              }
            />
          </div>

          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex-1 py-3 border-b">
              <h1 className="font-bold">Resources</h1>
            </div>

            <ul className="py-4">
              <li>
                <a href={`${ratingQuery?.methodologyModel?.id}`} className=" link-secondary">
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
