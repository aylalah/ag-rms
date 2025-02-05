import axios from "axios";
import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { FormLayout } from "@layouts/form-layout";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import { validateCookie } from "@helpers/cookies";

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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const fd = await request.formData();
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

  const { createRating, error } = await RMSservice(token).ratings.create({
    data,
  });

  return json({ message: createRating, error });
};

export default function CreateRatings() {
  const navigate = useNavigate();
  const { rating, formObjectQuery } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { message: string; error: string };

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
    });
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <Suspense fallback={null}>
        <Await resolve={formObjectQuery}>
          {({ formObject }) => (
            <FormLayout
              formObject={formObject as any}
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
