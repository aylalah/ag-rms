import { useFetcher, useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import RatingLayout from '@layouts/rating-layout';
import { useEffect } from 'react';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const { rating, error } = await RMSservice(token).ratings.one({ id });
  const { additionalFiles, questionnaireFiles, ...rest } = rating || {};

  return json({ rating, id, error });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      directory: '/tmp',
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  const method = request.method;
  const id = params.id as string;
  const { token } = await validateCookie(request);

  if (method === 'PATCH') {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const file = formData.get('file') as any;
    const reportTitle = formData.get('reportTitle') as any;
    const version = formData.get('version') as any;
    const fileName = `${id}-${reportTitle}.${version}`;
    const upload = await uploadStreamToSpaces(file, fileName);

    if (upload?.$metadata?.httpStatusCode === 200) {
      const reportFileUrl = upload?.Location;
      const { createReport, error } = await RMSservice(token).report.create({
        data: { reportFileUrl, reportTitle, version, rating: id },
      });
      return { message: createReport, error };
    }
  }

  return { error: 'Unable to upload report at this time' };
};

export default function Rating() {
  const { rating, error, id } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();

  return (
    <RatingLayout
      linkTo={`/app/ratings/${id}/uploaded-files/questionnaire-docs`}
      isClientOnly={false}
      rating={rating as any}
      Fetcher={Fetcher}
      isReadOnly={true}
    />
  );
}
