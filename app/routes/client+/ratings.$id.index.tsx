import RatingLayout from '@layouts/rating-layout';
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useFetcher, useLoaderData } from '@remix-run/react';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const { rating, error } = await RMSservice(token).ratings.one({ id });
  const { additionalFiles, questionnaireFiles, ...rest } = rating || {};
  const reports = [
    { name: 'Draft Report', version: '1.0', link: '' },
    { name: 'Draft Report', version: '2.0', link: '' },
    { name: 'Final Report', version: '1.0', link: '' },
  ];

  return json({ rating, reports, error });
};

export default function Rating() {
  const { rating, reports, error } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();

  return (
    <RatingLayout
      Fetcher={Fetcher}
      isClientOnly={true}
      linkTo="files-uploads"
      isReadOnly={false}
      rating={rating as any}
      reports={reports}
    />
  );
}
