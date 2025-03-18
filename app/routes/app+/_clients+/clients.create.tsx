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
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { validateCookie } from "@helpers/cookies";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);

  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });

  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";

  let clients = [] as any;

  if (searchQuery) {
    const queryData = await RMSservice(token).clients.all({
      limit: 20,
      where: { companyName: { contains: searchQuery, mode: "insensitive" } },
    });
    clients = queryData?.clients?.docs || [];
  }

  const result = (await RMSservice().clients.formObject()) as any;

  const logoIndex = result?.formObject?.findIndex(
    (el: any) => el.field === "logo"
  );
  if (logoIndex) result.formObject[logoIndex].type = "file";

  return json({ clients, client: null, formObject: result?.formObject });
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
    const fileName = `${data.companyName
      ?.replaceAll(" ", "-")
      ?.toLowerCase()}.${ext}`;
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
  const {
    clients: initialClients,
    client,
    formObject,
  } = useLoaderData<typeof loader>();

  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as {
    clients?: any[];
    message: string;
    error: string;
  };

  const [FormData, setFormData] = useState(formObject);
  const [Clients, setClients] = useState(initialClients || []);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (FetcherData?.message) {
      toast.success(FetcherData?.message, { toastId: "create-rating" });
      navigate(-1);
      return;
    }

    if (FetcherData?.error)
      toast.error(FetcherData?.error, { toastId: "create-rating" });
  }, [FetcherData]);

  useEffect(() => {
    if (FetcherData?.clients) {
      setClients(FetcherData?.clients);
    }
  }, [FetcherData]);

  useEffect(() => {
    if (search.length > 1) {
      Fetcher.load(`/app/clients/create?search=${encodeURIComponent(search)}`);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [search]);

  //modify formObject to include autoComplete in companyName field

  const modifiedFormObject = FormData.map((field: any) => {
    if (field.field === "companyName") {
      return {
        ...field,
        customRender: () => {
          return (
            <div className="relative">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={search ?? " "}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full px-4 py-3 border  shadow rounded outline-none resize-none border-line text-[15px] bg-base-100"
              />
              {showDropdown && Clients.length > 0 && (
                <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-md rounded mt-1 z-10">
                  {Clients.map((client: any) => (
                    <li
                      key={client.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <a href={`/app/clients/${client.id}`} className="block">
                        {client.companyName}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        },
      };
    }
    return field;
  });
  return (
    <div className="h-full pb-10 overflow-hidden">
      {/* <FormLayout
        formObject={FormData as any}
        Fetcher={Fetcher}
        data={client}
        slug="client"
      /> */}
      <FormLayout
        formObject={modifiedFormObject as any}
        Fetcher={Fetcher}
        data={client}
        slug="client"
      />
    </div>
  );
}
