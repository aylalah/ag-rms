import axios from 'axios';
import dayjs from 'dayjs';
import RatingsSummaryCard from '@ui/cards/rating-summary-card';
import RMSservice from '@modules/services';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const { rating, error } = await RMSservice(token)
    .ratings.one({
      id,
      include: { ratingClassModel: true, methodologyModel: true, questionnaireModel: true, clientModel: true },
    })
    .then((res) => ({ ...res }));

  return json({ rating, error });
};

export default function Rating() {
  const { rating, error } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col flex-1 h-full gap-4">
      <header className="">
        <h1 className="text-2xl font-bold">{rating?.clientModel?.companyName}</h1>
        <p className="text-lg font-normal opacity-70">{rating?.ratingTitle}</p>
      </header>

      <div className="flex flex-1 h-full gap-4">
        <div className="flex-1 bg-base-100">
          
        </div>

        <div className="w-[20em] flex flex-col gap-4 ">
          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex justify-between flex-1 py-3 border-b">
              <h1 className="font-bold">Summary</h1>
              <span className={`${rating?.status}`}>{rating?.status}</span>
            </div>

            <RatingsSummaryCard title="Rating Class" subTitle={rating?.ratingClassModel?.name || '-'} />

            <RatingsSummaryCard
              title="Issue Date"
              subTitle={!rating?.issueDate ? '-' : dayjs(rating?.issueDate).format('MMMM DD, YYYY')}
            />

            <RatingsSummaryCard
              title="Expiry Date"
              subTitle={!rating?.expiryDate ? '-' : dayjs(rating?.expiryDate).format('MMMM DD, YYYY')}
            />
          </div>

          <div className="p-4 border rounded bg-base-100 border-accent">
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
