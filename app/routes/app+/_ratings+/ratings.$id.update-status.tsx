import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token, user } = await validateCookie(request);
  const id = params.id as string;
  if (!token || !user) {
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  }
  const { rating, error } = await RMSservice(token).ratings.one({
    id,
    include: { invoiceModel: true, reportModel: true },
  });

  return { rating, error };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { token } = await validateCookie(request);
  const fd = await request.formData();
  const data = Object.fromEntries(fd.entries()) as any;
  const ratingId = data?.id;
  const statusUpdate = data?.status;
  if (!ratingId || !statusUpdate) {
    return json({ error: "Missing rating ID or status" });
  }
  try {
    const { updateRating, error } = await RMSservice(token).ratings.update({
      id: ratingId,
      data: { status: statusUpdate },
    });
    if (error)
      return json({ error: error?.message || "Failed to update rating" });
    return json({
      success: true,
      updateRating,
      message: "Status successfully updated",
    });
  } catch (error) {
    console.error(error);
    return json({ error: "An unexpected error occured" });
  }
};

export default function UpdateStatus({ onClose }: { onClose: () => void }) {
  const { rating } = useLoaderData<typeof loader>();
  interface FetcherData {
    success?: boolean;
    error?: string;

    message?: string;
    rating?: typeof rating;
  }
  const fetcher = useFetcher<FetcherData>();

  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success(fetcher.data?.message, { toastId: "success" });
      setTimeout(() => {
        onClose();
      }, 1500);
    }
    if (fetcher.data?.success === false) {
      toast.error(fetcher.data?.error, { toastId: "error" });
    }
    if (fetcher.state === "idle" && fetcher.data?.message) {
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative modal-box">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-secondary"
        >
          <i className="ri-close-line text-xl cursor-pointer" />
        </button>

        <h2> Update Rating Status</h2>
        <fetcher.Form
          method="patch"
          action={`/app/ratings/${rating?.id}/update-status`}
        >
          <input
            type="hidden"
            name="ratingTitle"
            value={rating?.ratingTitle || ""}
          />
          <input type="hidden" name="id" value={rating?.id} />
          <select
            required
            name="status"
            className="w-full select select-bordered mt-4"
            defaultValue={rating?.status ?? ""}
          >
            <option value="ongoing">Ongoing</option>
            <option value="concluded">Concluded</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            type="submit"
            className="btn btn-secondary mt-4"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Updating..." : "Update Status"}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
