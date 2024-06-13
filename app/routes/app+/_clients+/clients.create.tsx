import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { FormLayout } from "@layouts/form-layout";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { validateCookie } from "@helpers/cookies";
import { sendEmailService } from "@helpers/email";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const { formObject } = await RMSservice().clients.formObject();

  return { client: null, formObject };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  const { token } = await validateCookie(request);

  data.role = "client";
  const { createClient, error } = await RMSservice(token).clients.create({
    data,
  });

  return json({ message: createClient, error });
};

export default function Breeds() {
  const navigate = useNavigate();
  const { client, formObject } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };
  const [emailCount, setEmailCount] = useState(0);

  const [FormData, setFormData] = useState(formObject);

  useEffect(() => {
    if (FetcherData?.message) {
      toast.success(FetcherData?.message, { toastId: "create-rating" });
      navigate(-1);
      return;
    }

    if (FetcherData?.error)
      toast.error(FetcherData?.error, { toastId: "create-rating" });
  }, [FetcherData]);

  const addEmail = () => {
    const x = [
      {
        field: `email${emailCount + 1}`,
        type: "text",
        required: true,
        list: null,
        value: null,
      },
      {
        field: `password${emailCount + 1}`,
        type: "text",
        required: true,
        list: null,
        value: randomString(10),
      },
    ];

    setFormData([...(FormData as any), ...x]);
    setEmailCount(emailCount + 1);
  };

  return (
    <div className="h-full pb-10 overflow-hidden">
      <FormLayout
        formObject={FormData as any}
        Fetcher={Fetcher}
        data={client}
        slug="client"
      />
    </div>
  );
}
