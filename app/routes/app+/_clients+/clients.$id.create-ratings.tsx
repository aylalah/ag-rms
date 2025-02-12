import axios from "axios";
import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { FormLayout } from "@layouts/form-layout";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateCookie } from "@helpers/cookies";
import { dbQuery } from "@helpers/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { apiToken, token, user } = await validateCookie(request);

  if (!token || !user) {
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  }

  const formObjectQuery = RMSservice(apiToken)
    .ratings.formObject({ apiToken, token, user })
    .then((data) => {
      const { formObject, error } = data;

      return { formObject, error };
    });

  return defer({ rating: null, formObjectQuery });
};

interface IResponse {
  Header: string;
  Response?: {
    file: string | null;
    text: string | null;
  };
  Question: string;
}

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
  // const fd = await request.formData();
  // const data = Object.fromEntries(fd.entries()) as any;
  const fd = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = Object.fromEntries(fd.entries()) as any;

  const { token } = await validateCookie(request);
  const id = params.id as string;

  if (!data?.issueDate) delete data.issueDate;
  if (!data?.expiryDate) delete data.expiryDate;
  if (!data?.ratingClass) delete data.ratingClass;

  data.client = id;
  //  data.ratingScore = Number(data.ratingScore);
  data.ratingScore = data.ratingScore;
  data.ratingYear = Number(data.ratingYear);
  data.issueDate = data.issueDate && new Date(data.issueDate);
  data.expiryDate = data.expiryDate && new Date(data.expiryDate);

  const questionnaireData = await RMSservice(token).questionnaires.one({
    id: data.questionnaire,
  });
  const questionnairesUrl = questionnaireData?.questionnaire?.url;
  if (!questionnairesUrl) return json({ error: "Questionnaire not found" });

  const loe = data?.loe;
  const invoice = data?.invoice;

  if (loe.size > 0) {
    const ext = loe.type.split("/")[1];
    const fileName = `${data.ratingTitle}-loe.${ext}`;
    const upload = await uploadLoeToSpaces(loe, fileName);

    if (upload.$metadata?.httpStatusCode === 200) {
      const loeDoc = await dbQuery.letterOfEngagement.create({
        data: {
          name: fileName,
          url: upload.Location as string,
        },
      });
      data.loe = loeDoc.id;
      // ✅ Save ObjectId instead of URL
    }
  }
  if (invoice.size > 0) {
    const ext = invoice.type.split("/")[1];
    const fileName = `${data.ratingTitle}-invoice.${ext}`;
    const upload = await uploadInvoiceToSpaces(invoice, fileName);
    if (upload.$metadata?.httpStatusCode === 200) {
      const invoiceDoc = await dbQuery.invoice.create({
        data: {
          name: fileName,
          url: upload.Location as string,
        },
      });
      data.invoice = invoiceDoc.id;
    }
  }

  const { createRating, error } = await RMSservice(token).ratings.create({
    data,
  });
  if (error) {
    console.error("Error creating rating:", error);
    return json({ error });
  }
  return json({ message: createRating, error });
};

export default function CreateRatings() {
  const navigate = useNavigate();
  const { rating, formObjectQuery } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };
  const [updatedFormObject, setUpdatedFormObject] = useState<any>(null);

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
    toast.promise(
      formObjectQuery,
      { pending: "Loading form data" },
      { toastId: "form-object" }
    );

    formObjectQuery.then((data) => {
      if (data?.error)
        toast.error(data?.error, { toastId: "form-object-response" });
      if (data?.error) {
        setTimeout(() => window.history.back(), 3000);
      }
      const updatedData = data?.formObject?.map((el: any) =>
        ["primaryAnalyst", "loe", "invoice"].includes(el.field)
          ? { ...el, required: true }
          : el
      );
      setUpdatedFormObject(updatedData);
    });
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <Suspense fallback={null}>
        <Await resolve={formObjectQuery}>
          {({ formObject }) => (
            <FormLayout
              // formObject={formObject as any}
              formObject={updatedFormObject || (formObject as any)}
              Fetcher={Fetcher}
              data={rating}
              slug="rating"
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
