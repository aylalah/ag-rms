import axios from "axios";
import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
  redirectDocument,
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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { apiToken, token } = await validateCookie(request);
  const ratingId = params.id as string;
  const { rating, error } = await RMSservice(token).ratings.one({
    id: ratingId,
  });

  const formObjectQuery = RMSservice(apiToken)
    .ratings.formObject({ apiToken, token })
    .then((data) => {
      const { formObject, error } = data;

      const editedFormObject = formObject
        ?.filter((el) => el?.field !== "ratingTitle")
        .filter((el) => el?.field !== "ratingYear")
        .filter((el) => el?.field !== "supervisor")
        .filter((el) => el?.field !== "primaryAnalyst")
        .filter((el) => el?.field !== "secondaryAnalyst")
        .filter((el) => el?.field !== "methodology")
        .filter((el) => el?.field !== "questionnaire")
        .filter((el) => el?.field !== "status");

      return {
        error,
        formObject: editedFormObject?.map((el) => ({ ...el, required: true })),
      };
    });

  return defer({ rating, formObjectQuery });
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
  const { token } = await validateCookie(request);
  const ratingId = params.id as string;
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;

  // data.ratingScore = Number(data.ratingScore);
  data.ratingScore = data.ratingScore;
  data.issueDate = data.issueDate && new Date(data.issueDate);
  data.expiryDate = data.expiryDate && new Date(data.expiryDate);

  const { updateRating, error } = await RMSservice(token).ratings.update({
    id: ratingId,
    data,
  });
  if (updateRating) throw redirectDocument(`/app/ratings/${ratingId}`);

  // console.log({ updateRating, error });
  return { error, message: updateRating };
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

  useEffect(() => {
    toast.success("Update rating class, issue date, and expiry date", {
      toastId: "update-rating",
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
              canDelete={false}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
