import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { FormLayout } from '@layouts/form-layout';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const { id } = params;
  const { formObject } = await RMSservice(token).clients.formObject();

  if (id) {
    const res = await RMSservice(token).clients.one({ id });
    const formattedFormObject = formObject?.map((el) => {
      const field = el?.field;
      const defaultValue = res?.client?.[field as keyof typeof res.client];
      return { ...el, value: defaultValue };
    });

    return json({ client: res?.client, error: res?.error, formObject: formattedFormObject });
  }

  throw redirect('/app/clients');
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  const { token } = await validateCookie(request);
  const method = request.method;
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  if (method === 'PATCH' && id) {
    const { updateClient, error } = await RMSservice(token).clients.update({ id, data });
    return json({ message: updateClient, error });
  }

  if (method === 'DELETE' && id) {
    const { deleteClient, error } = await RMSservice(token).clients.delete({ id });
    return json({ message: deleteClient, error });
  }
};

export default function Breeds() {
  const { client, formObject } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };
  const navigate = useNavigate();

  useEffect(() => {
    if (FetcherData?.message) {
      toast.success(FetcherData?.message, { toastId: 'success' });
      navigate(-1);
      return;
    }
    if (FetcherData?.error) alert(FetcherData?.error);
  }, [FetcherData]);

  return (
    <div className="h-full pb-10 overflow-hidden">
      <FormLayout formObject={formObject as any} Fetcher={Fetcher} data={client} slug="client" />
    </div>
  );
}
