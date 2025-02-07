import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { FormLayout } from "@layouts/form-layout";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { validateCookie } from "@helpers/cookies";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  const { id } = params;
  const { formObject } = await RMSservice(token).clients.formObject();

  if (id) {
    const res = await RMSservice(token).clients.one({ id });
    const formattedFormObject = formObject?.map((el) => {
      const field = el?.field;
      const defaultValue = res?.client?.[field as keyof typeof res.client];
      return { ...el, value: defaultValue };
    }) as any;

    const logoIndex = formattedFormObject?.findIndex(
      (el: any) => el.field === "logo"
    );
    if (logoIndex) formattedFormObject[logoIndex].type = "file";

    return json({
      client: res?.client,
      error: res?.error,
      formObject: formattedFormObject,
    });
  }

  throw redirect("/app/clients");
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
  const { id } = params;
  const { token } = await validateCookie(request);
  const method = request.method;

  if (method === "PATCH" && id) {
    const fd = await unstable_parseMultipartFormData(request, uploadHandler);
    const data = Object.fromEntries(fd.entries()) as any;
    const file = data?.logo;

    if (file.size > 0) {
      const ext = file.type.split("/")[1];
      const fileName = `${data.companyName
        ?.replaceAll(" ", "-")
        ?.toLowerCase()}.${ext}`;
      const upload = await uploadLogoToSpaces(file, fileName);
      if (upload.$metadata?.httpStatusCode === 200) data.logo = upload.Location;
    } else {
      delete data?.logo;
    }

    const { updateClient, error } = await RMSservice(token).clients.update({
      id,
      data,
    });
    return json({ message: updateClient, error });
  }

  if (method === "DELETE" && id) {
    const { deleteClient, error } = await RMSservice(token).clients.delete({
      id,
    });
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
      toast.success(FetcherData?.message, { toastId: "success" });
      navigate(-1);
      return;
    }
    if (FetcherData?.error) alert(FetcherData?.error);
  }, [FetcherData]);

  return (
    <div className="h-full pb-10 overflow-hidden">
      <FormLayout
        formObject={formObject as any}
        Fetcher={Fetcher}
        data={client}
        slug="client"
      />
    </div>
  );
}
