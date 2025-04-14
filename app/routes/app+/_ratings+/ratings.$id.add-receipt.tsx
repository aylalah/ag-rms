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
import { useFetcher, useLoaderData } from "@remix-run/react";
import { on } from "nodemailer/lib/xoauth2";
import { useEffect, useState } from "react";
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
    include: { invoiceModel: true, reportModel: true, receiptModel: true },
  });
  if (!rating) {
    throw new Error("Rating not found");
  }

  return json({ rating: rating as any, id, error });
};

const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    avoidFileConflicts: true,
    directory: "/tmp",
    maxPartSize: 5_000_000,
    file: ({ filename }) => filename,
  }),
  unstable_createMemoryUploadHandler()
);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { token, user } = await validateCookie(request);

  if (!token) {
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  }

  const fd = await unstable_parseMultipartFormData(request, uploadHandler);

  const data = Object.fromEntries(fd.entries()) as any;
  const receipt = data.receipt as File;
  const id = params.id as string;

  const allowedIds = [
    Number(data.supervisorId),
    Number(data.primaryAnalystId),
    Number(data.secondaryAnalystId),
  ];

  if (!allowedIds.includes(Number(user?.employee_id))) {
    return json(
      {
        error: "You are not allowed to upload report for this rating",
        success: false,
      },
      { status: 403 }
    );
  }

  try {
    const rating = await dbQuery.rating.findUnique({
      where: { id },
      include: { receiptModel: true, invoiceModel: true },
    });

    if (!rating) {
      return json({ error: "Rating not found" });
    }
    const fileName = `${data.ratingTitle}-receipt.pdf`;
    const upload = await uploadReceiptToSpaces(receipt, fileName);
    if (upload.$metadata?.httpStatusCode !== 200) {
      return json({ error: "Failed to upload invoice" });
    }

    const receiptDoc = await dbQuery.receipt.create({
      data: {
        name: fileName,
        url: upload.Location as string,
      },
    });
    const updatedRating = await dbQuery.rating.update({
      where: { id },
      data: {
        receipt: receiptDoc.id,
      },
      include: {
        receiptModel: true,
        invoiceModel: true,
        clientModel: {
          include: { contactModel: true },
        },
      },
    });
    //sendEmail to supervisor
    const supervisor = JSON.parse(rating?.supervisor || "{}");

    sendEmail({
      to: `${supervisor?.firstname} ${supervisor?.lastname}`,
      email: supervisor?.email,
      subject: "Payment Receipt Uploaded",
      html: `<p>Dear ${supervisor?.firstname} ${supervisor?.lastname},</p>
         <p> Please be informed that the payment receipt for ${updatedRating?.ratingTitle} has been uploaded on the Agusto RMS portal.</p>
          <p>Please log in to the <a href="https://arms.agusto.com">RMS portal</a> to view</p>
  
          <p>Best Regards,</p>
         <p>Agusto & Co RMS Team</p>`,
    });

    //sendEmail to client (contacts)
    const contacts = updatedRating?.clientModel?.contactModel || [];
    const emailPromises = contacts.map((el) =>
      sendEmail({
        to: el?.fullName,
        email: el?.email,
        subject: "Receipt Uploaded",
        html: `<p>Dear ${el.fullName},</p>
          <p> Please be informed that the payment receipt for ${updatedRating?.ratingTitle} has been uploaded on the Agusto RMS portal.</p>
          <p>Please log in to the <a href="https://arms.agusto.com">RMS portal</a> to view</p>
  
          <p>Best Regards,</p>
         <p>Agusto & Co RMS Team</p>
  
          `,
      }).catch((error) => ({ email: el.email, error: error.message }))
    );

    const emailResults = await Promise.allSettled(emailPromises);
    const failedEmails = emailResults.filter((r) => r.status === "rejected");

    if (failedEmails.length > 0) {
      console.error("Some emails failed to send:", failedEmails);
    }

    return json({
      success: true,
      message: "Receipt uploaded successfully",
      rating: updatedRating,
    });
  } catch (error) {
    return json({ error: "Failed to upload receipt", success: false });
  }
};

export default function AddReceipt({ onClose }: { onClose: () => void }) {
  const { rating } = useLoaderData<typeof loader>();
  interface FetcherData {
    success?: boolean;
    error?: string;

    message?: string;
    rating?: typeof rating; // ✅ Works if rating is already typed
  }
  const fetcher = useFetcher<FetcherData>();

  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success(fetcher.data?.message, { toastId: "success" });
    }
    if (fetcher.data?.success === false) {
      toast.error(fetcher.data?.error, { toastId: "error" });
    }
    if (
      (fetcher.state === "idle" && fetcher.data?.message) ||
      fetcher.data?.error
    ) {
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const fileInput = document.getElementById("receipt") as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      event.preventDefault();
      alert(
        "Please select a receipt file before clicking on the upload button"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative modal-box">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-secondary"
        >
          <i className="ri-close-line text-xl cursor-pointer" />
        </button>

        <h2> Upload Receipt</h2>
        <fetcher.Form
          method="patch"
          encType="multipart/form-data"
          action={`/app/ratings/${rating?.id}/add-receipt`}
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="ratingTitle"
            value={rating?.ratingTitle || ""}
          />
          <input type="hidden" name="id" value={rating?.id} />
          <input
            type="hidden"
            name="supervisorId"
            value={rating?.SupervisorObject?.employee_id as any}
          />
          <input
            type="hidden"
            name="primaryAnalystId"
            value={rating?.PrimaryAnalystObject?.employee_id}
          />
          <input
            type="hidden"
            name="secondaryAnalystId"
            value={rating?.SecondaryAnalystObject?.employee_id}
          />
          <input
            type="file"
            name="receipt"
            id="receipt"
            accept=".pdf"
            required
          />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Uploading..." : "Upload Receipt"}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
