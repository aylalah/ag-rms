import { useFetcher, useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import RatingLayout from '@layouts/rating-layout';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const { rating, error } = await RMSservice(token).ratings.one({ id });
  const { responses, ...rest } = rating || {};
  const reports = [
    { name: 'Draft Report', version: '1.0', link: '' },
    { name: 'Draft Report', version: '2.0', link: '' },
    { name: 'Final Report', version: '1.0', link: '' },
  ];

  return json({ rating, reports, error });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  return {};
};

export default function Rating() {
  const { rating, reports, error } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher({ key: 'upload' });

  return <RatingLayout rating={rating} Fetcher={Fetcher} reports={reports} isReadOnly={true} />;
}
