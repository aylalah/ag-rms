import RMSservice from '@modules/services';
import { ActionFunctionArgs, defer, json, LoaderFunctionArgs } from '@remix-run/node';
import { Await, useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { FormLayout } from '@layouts/form-layout';
import { Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { apiToken, token } = await validateCookie(request);
  const formObjectQuery = RMSservice(apiToken)
    .ratings.formObject({ apiToken, token })
    .then((data) => {
      const { formObject, error } = data;
      return { formObject, error };
    });
  return defer({ rating: null, formObjectQuery });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;
  const { token, user } = await validateCookie(request);
  const id = params.id as string;

  if (!data?.issueDate) delete data.issueDate;
  if (!data?.expiryDate) delete data.expiryDate;
  if (!data?.ratingClass) delete data.ratingClass;

  data.client = id;
  data.ratingYear = Number(data.ratingYear);
  data.issueDate = data.issueDate && new Date(data.issueDate);
  data.expiryDate = data.expiryDate && new Date(data.expiryDate);

  console.log(data);

  const { createRating, error } = await RMSservice(token).ratings.create({ data });
  return json({ message: createRating, error });
};

export default function CreateRatings() {
  const navigate = useNavigate();
  const { rating, formObjectQuery } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };

  useEffect(() => {
    if (FetcherData?.message) {
      toast.success(FetcherData?.message, { toastId: 'create-rating' });
      navigate(-1);
      return;
    }

    if (FetcherData?.error) toast.error(FetcherData?.error, { toastId: 'create-rating' });
  }, [FetcherData]);

  return (
    <div className="h-full pb-10 overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={formObjectQuery}>
          {({ formObject }) => (
            <FormLayout formObject={formObject as any} Fetcher={Fetcher} data={rating} slug="rating" />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
