import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { FormLayout } from "@layouts/form-layout";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { validateCookie } from "@helpers/cookies";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const result = (await RMSservice().clients.formObject()) as any;

  const logoIndex = result?.formObject?.findIndex((el: any) => el.field === "logo");
  if (logoIndex) result.formObject[logoIndex].type = "file";
  return { client: null, formObject: result?.formObject };
};

const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    avoidFileConflicts: true,
    directory: "/tmp",
    maxPartSize: 30_000_000,
    file: ({ filename }) => filename,
  }),
  unstable_createMemoryUploadHandler()
);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const fd = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = Object.fromEntries(fd.entries()) as any;
  const { token } = await validateCookie(request);

  //save the file to digital ocean if size is greater than 0
  const file = data?.logo;
  if (file.size > 0) {
    const ext = file.type.split("/")[1];
    const fileName = `${data.companyName?.replaceAll(" ", "-")?.toLowerCase()}.${ext}`;
    const upload = await uploadLogoToSpaces(file, fileName);
    if (upload.$metadata?.httpStatusCode === 200) data.logo = upload.Location;
  } else {
    delete data?.logo;
  }

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

  const [FormData, setFormData] = useState(formObject);

  useEffect(() => {
    if (FetcherData?.message) {
      toast.success(FetcherData?.message, { toastId: "create-rating" });
      navigate(-1);
      return;
    }

    if (FetcherData?.error) toast.error(FetcherData?.error, { toastId: "create-rating" });
  }, [FetcherData]);

  return (
    <div className="h-full pb-10 overflow-hidden">
      <FormLayout formObject={FormData as any} Fetcher={Fetcher} data={client} slug="client" />
    </div>
  );
}
