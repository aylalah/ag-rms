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
  const { formObject } = await RMSservice(token).questionnaires.formObject();

  if (slug === 'create') return { questionnaire: null, formObject };

  if (slug === 'edit' && id) {
    const res = await RMSservice(token).questionnaires.one({ id });
    const formattedFormObject = formObject?.map((el) => {
      const field = el?.field;
      const defaultValue = res?.questionnaire?.[field as keyof typeof res.questionnaire];
      return { ...el, value: defaultValue };
    });

    return json({ questionnaire: res?.questionnaire, error: res?.error, formObject: formattedFormObject });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { slug, id } = params;
  const { token } = await validateCookie(request);
  const method = request.method;
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  if (slug === 'create') {
    const { createQuestionnaire, error } = await RMSservice(token).questionnaires.create({ data });
    return json({ message: createQuestionnaire, error });
  }

  if (slug === 'PATCH' && id) {
    const { updateQuestionnaire, error } = await RMSservice(token).questionnaires.update({ id, data });
    return json({ message: updateQuestionnaire, error });
  }

  if (method === 'DELETE' && id) {
    console.log('deleting');
    const { deleteQuestionnaire, error } = await RMSservice(token).questionnaires.delete({ id });
    return json({ message: deleteQuestionnaire, error });
  }
};

export default function Breeds() {
  const navigate = useNavigate();
  const { questionnaire, formObject } = useLoaderData<typeof loader>();
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
      <FormLayout formObject={formObject as any} Fetcher={Fetcher} data={questionnaire} slug="questionnaire" />
    </div>
  );
}
