import { useFetcher, useLoaderData } from "@remix-run/react";
import { validateCookie } from "@helpers/cookies";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import RatingLayout from "@layouts/rating-layout";
import { useEffect } from "react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);

  const { rating, error } = await RMSservice(token)
    .ratings.one({ id })
    .then((res) => {
      const { rating, error } = res || {};

      const SupervisorObject = rating?.supervisor
        ? JSON.parse(rating?.supervisor as any)
        : null;
      const PrimaryAnalystObject = rating?.primaryAnalyst
        ? JSON.parse(rating?.primaryAnalyst as any)
        : null;
      const SecondaryAnalystObject = rating?.secondaryAnalyst
        ? JSON.parse(rating?.secondaryAnalyst as any)
        : null;

      return {
        error,
        rating: {
          ...rating,

          contacts: rating?.clientModel?.contactModel.map((el) => ({
            id: el?.id,
            name: el?.fullName,
            email: el?.email,
          })),
          year: rating?.ratingYear,
          title: rating?.ratingTitle,
          primaryAnalyst:
            PrimaryAnalystObject?.firstname +
            " " +
            PrimaryAnalystObject?.lastname,
          secondaryAnalyst:
            SecondaryAnalystObject?.firstname +
            " " +
            SecondaryAnalystObject?.lastname,
          primaryAnalystEmail: PrimaryAnalystObject?.email,
          secondaryAnalystEmail: SecondaryAnalystObject?.email,
          SupervisorObject,
          PrimaryAnalystObject,
          SecondaryAnalystObject,
        },
      };
    });

  const { additionalFiles, questionnaireFiles, ...rest } = rating || {};

  return json({ rating: rating as typeof rating, id, error });
};

const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    maxPartSize: 5_000_000,
    directory: "/tmp",
    file: ({ filename }) => filename,
  }),
  unstable_createMemoryUploadHandler()
);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const method = request.method;
  const id = params.id as string;
  const { token, user } = await validateCookie(request);

  if (method === "PATCH") {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const body = Object.fromEntries(formData.entries()) as unknown as any;

    const allowedIds = [
      Number(body.supervisorId),
      Number(body.primaryAnalystId),
      Number(body.secondaryAnalystId),
    ];
    console.log(user?.employee_id, "employee id", allowedIds, "allowed ids");
    if (!allowedIds.includes(Number(user?.employee_id)))
      return json(
        { error: "You are not allowed to upload report for this rating" },
        { status: 403 }
      );

    const file = body?.file as any;

    const finalLetter = body?.finalLetter;
    const consentLetter = body?.consentLetter;
    const reportTitle = body?.reportTitle;
    const version = body?.version;
    const data = {
      reportFileUrl: null,
      finalLetterUrl: null,
      consentLetterUrl: null,
      reportTitle,
      version,
      rating: id,
      status: "sent",
    };
    const contacts = JSON.parse(body?.contacts as any);
    const year = body?.year;
    const title = body?.title;

    if (file?.size > 0) {
      let fileName = `${id}-${reportTitle}.${version}`;
      const upload = await uploadStreamToSpaces(file, fileName);
      if (upload?.$metadata?.httpStatusCode === 200)
        data.reportFileUrl = upload?.Location as any;
    }

    if (finalLetter > 0) {
      let fileName = `${id}-${reportTitle}-letter.${version}`;
      const upload = await uploadStreamToSpaces(finalLetter, fileName);
      if (upload?.$metadata?.httpStatusCode === 200)
        data.finalLetterUrl = upload?.Location as any;
    }

    if (consentLetter > 0) {
      let fileName = `${id}-${reportTitle}-consent-letter.${version}`;
      const upload = await uploadStreamToSpaces(consentLetter, fileName);
      if (upload?.$metadata?.httpStatusCode === 200)
        data.consentLetterUrl = upload?.Location as any;
    }

    if (reportTitle?.toLowerCase().includes("final")) data.status = "pending";

    const { CreateReport, error } = await RMSservice(token).report.create({
      data,
    });

    if (CreateReport) {
      if (data?.status === "pending") {
        sendEmailService({
          From: "info@agusto.com",
          To: body.supervisorEmail,
          Subject: "Final Rating Report Uploaded",
          HtmlBody: `<p>Dear Team Lead,</p>
          <p> ${user?.firstname} ${user?.lastname} has uploaded the final rating report for ${title} and accompanying letter on the Agusto RMS portal for your review and approval.</p>
          `,
        });
      } else {
        contacts?.forEach((el) => {
          sendEmailService({
            From: "info@agusto.com",
            To: el?.email,
            Subject: "Draft Rating Report Uploaded",
            HtmlBody: `<p>Dear Agusto & Co. Rating Client</p>
            <p>The draft report for the ${year} rating of ${title} has been uploaded on the Agusto Rating Management System. Please log in to the portal
            and review the document for any:</p>
            <ul>
            <li>Factual Errors</li>
            <li>Information you consider confidential contained therein</li>
            <li>Opinions that we have expressed that you disagree with, stating your reason(s) for disagreement</li>

            </ul>
            <p> Please let us have your comments on the draft report no later than one week after the draft is sent out</p>`,
          });
        });
      }
    }

    return { message: CreateReport, error };
  }

  return { error: "Unable to upload report at this time" };
};

export default function Rating() {
  const { rating, error, id } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();

  return (
    <RatingLayout
      linkTo={`/app/ratings/${id}/uploaded-files/questionnaire-docs`}
      isClientOnly={false}
      rating={rating as any}
      Fetcher={Fetcher}
      isReadOnly={true}
      SupervisorObject={rating?.SupervisorObject}
      PrimaryAnalystObject={rating?.PrimaryAnalystObject}
      SecondaryAnalystObject={rating?.SecondaryAnalystObject}
    />
  );
}
