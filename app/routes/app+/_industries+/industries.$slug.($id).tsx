import RMSservice from '@modules/services';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { FormLayout } from '@layouts/form-layout';
import { useEffect } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const { slug, id } = params;
  const { formObject } = await RMSservice(token).industries.formObject();

  if (slug === 'create') return { industry: null, formObject };

  if (slug === 'edit' && id) {
    const res = await RMSservice(token).industries.one({ id });
    const formattedFormObject = formObject?.map((el) => {
      const field = el?.field;
      const defaultValue = res?.industry?.[field as keyof typeof res.industry];
      return { ...el, value: defaultValue };
    });

    return json({ industry: res?.industry, error: res?.error, formObject: formattedFormObject });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { slug, id } = params;
  const { token } = await validateCookie(request);
  const method = request.method;
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  if (slug === 'create') {
    const { createIndustry, error } = await RMSservice(token).industries.create({ data });
    return json({ message: createIndustry, error });
  }

  if (slug === 'edit' && id) {
    const { updateIndustry, error } = await RMSservice(token).industries.update({ id, data });
    return json({ message: updateIndustry, error });
  }

  if (method === 'DELETE' && id) {
    const { deleteIndustry, error } = await RMSservice(token).industries.delete({ id });
    return json({ message: deleteIndustry, error });
  }
};

export default function Breeds() {
  const { industry, formObject } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };

  useEffect(() => {
    if (FetcherData?.message) alert(FetcherData?.message);
    if (FetcherData?.error) alert(FetcherData?.error);
  }, [FetcherData]);

  return (
    <div className="h-full pb-10 overflow-hidden">
      <FormLayout formObject={formObject as any} Fetcher={Fetcher} data={industry} slug="industry" />
    </div>
  );
}
