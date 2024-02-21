import RMSservice from '@modules/services';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { FormLayout } from '@layouts/form-layout';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const { slug, id } = params;
  const { formObject } = await RMSservice(token).methodologies.formObject();

  if (slug === 'create') return { methodology: null, formObject };

  if (slug === 'edit' && id) {
    const res = await RMSservice(token).methodologies.one({ id });
    const formattedFormObject = formObject?.map((el) => {
      const field = el?.field;
      const defaultValue = res?.methodology?.[field as keyof typeof res.methodology];
      return { ...el, value: defaultValue };
    });

    return json({ methodology: res?.methodology, error: res?.error, formObject: formattedFormObject });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { slug, id } = params;
  const { token } = await validateCookie(request);
  const method = request.method;
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  if (slug === 'create') {
    const { createMethodology, error } = await RMSservice(token).methodologies.create({ data });
    return json({ message: createMethodology, error });
  }

  if (slug === 'PATCH' && id) {
    const { updateMethodology, error } = await RMSservice(token).methodologies.update({ id, data });
    return json({ message: updateMethodology, error });
  }

  if (method === 'DELETE' && id) {
    const { deleteMethodology, error } = await RMSservice(token).methodologies.delete({ id });
    return json({ message: deleteMethodology, error });
  }
};

export default function Breeds() {
  const navigate = useNavigate();
  const { methodology, formObject } = useLoaderData<typeof loader>();
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
      <FormLayout formObject={formObject as any} Fetcher={Fetcher} data={methodology} slug="methodology" />
    </div>
  );
}
