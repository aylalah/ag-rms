import { deleteInvoiceFromSpaces } from "@helpers/upload-file";
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
    include: { invoiceModel: true, reportModel: true },
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

  const id = params.id as string;
  const invoice = data.invoice as File;

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

  if (!invoice || invoice.size === 0) {
    return json({ error: "Please upload an invoice" });
  }

  try {
    //check for exisiting invoices, so we can have numbered versions
    const existingInvoices = await dbQuery.invoice.findMany({
      where: {
        name: { startsWith: `${data.ratingTitle}-invoice` },
      },
    });

    const nextVersion = existingInvoices.length + 1;

    const rating = await dbQuery.rating.findUnique({
      where: { id },
      include: { invoiceModel: true },
    });

    if (!rating) {
      return json({ error: "Rating not found" });
    }

    const ext = invoice.type.split("/")[1];
    const fileName = `${data.ratingTitle}-invoice-${nextVersion}.${ext}`;

    const upload = await uploadInvoiceToSpaces(invoice, fileName);
    if (upload.$metadata?.httpStatusCode !== 200) {
      return json({ error: "Failed to upload invoice" });
    }

    const invoiceDoc = await dbQuery.invoice.create({
      data: {
        name: fileName,
        url: upload.Location as string,
      },
    });

    const updatedRating = await dbQuery.rating.update({
      where: { id },
      data: {
        //I am replacing instead of pushing to this array becuase we want to keep just the most recent array
        //if that changes in the future, we can push to the array, however, I am not
        //deleting the invoice from spaces.
        invoice: invoiceDoc.id,
      },
      include: {
        invoiceModel: true,
        clientModel: {
          include: {
            contactModel: true,
          },
        },
      },
    });

    //becuase I am no longer deleting invoice, to prevent the issue of seeing the old invoice,
    //we have to refresh the rating object to get the updated invoice
    const RatingWithUpdatedInvoice = await dbQuery.rating.findUnique({
      where: { id },
      include: { invoiceModel: true }, // Force fresh invoiceModel data
    });
    /* 
   //I am commenting this out, becuase I am thinking it might be better to have a historical of references in the space
   if (rating?.invoiceModel?.name) {
      try {
        await deleteInvoiceFromSpaces(rating?.invoiceModel?.name);
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
*/
    const supervisorData = updatedRating?.supervisor
      ? JSON.parse(updatedRating.supervisor)
      : null;
    sendEmail({
      to: `${supervisorData?.firstname} ${supervisorData?.lastname}`,
      email: supervisorData?.email,
      subject: "New Invoice",
      html: `<p>Dear ${supervisorData?.firstname} ${supervisorData?.lastname},</p>
      <p> An updated invoice  for ${updatedRating?.ratingTitle} has been uploaded on the Agusto RMS portal.</p>
        <p>Please log in to the <a href="https://arms.agusto.com">RMS portal</a> to view</p>
        <p>Best Regards,</p>
       <p>Agusto & Co RMS Team</p>
        `,
    });
    const contacts = updatedRating?.clientModel?.contactModel || [];
    //notify contacts of new invoice upload
    const emailPromises = contacts.map((el) =>
      sendEmail({
        to: el?.fullName,
        email: el?.email,
        subject: "New Invoice",
        html: `<p>Dear ${el.fullName},</p>
        <p> An updated invoice  for ${updatedRating?.ratingTitle} has been uploaded on the Agusto RMS portal.</p>
        <p>Please log in to your <a href="https://arms.agusto.com">RMS portal</a> to view</p>

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
      message: "Invoice updated successfully",
      rating: RatingWithUpdatedInvoice,
    });
  } catch (error) {
    return json({ error: "Failed to upload invoice", success: false });
  }
};

export default function EditInvoice({ onClose }: { onClose: () => void }) {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative modal-box">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-secondary"
        >
          <i className="ri-close-line text-xl cursor-pointer" />
        </button>

        <h2> Upload New Invoice</h2>
        <fetcher.Form
          method="patch"
          encType="multipart/form-data"
          action={`/app/ratings/${rating?.id}/edit-invoice`}
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
          <input type="file" name="invoice" id="invoice" accept=".pdf" />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Uploading..." : "Upload Invoice"}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
