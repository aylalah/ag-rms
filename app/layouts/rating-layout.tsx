import { Rating } from "@helpers/zodPrisma";
import EditInvoice from "@routes/app+/_ratings+/ratings.$id.edit-invoice";
import { FetcherWithComponents, Link, useNavigate } from "@remix-run/react";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { report } from "node:process";
import UpdateStatus from "@routes/app+/_ratings+/ratings.$id.update-status";
import AddReceipt from "@routes/app+/_ratings+/ratings.$id.add-receipt";

type AnalystObj = {
  employee_id: number;
  firstname: string;
  lastname: string;
  email: string;
};

type RatingProps = {
  rating: RatingWithRelations & {
    primaryAnalystEmail?: string;
    secondaryAnalystEmail?: string;
    contacts?: any;
  };
  Fetcher: FetcherWithComponents<any>;
  reports?: { name: string; version: string; link: string }[];
  isReadOnly?: boolean;
  linkTo: string;

  isClientOnly: boolean;
  SupervisorObject?: AnalystObj;
  PrimaryAnalystObject?: AnalystObj;
  SecondaryAnalystObject?: AnalystObj;
};

const reportUploadMenu = [{ name: "Draft Report" }, { name: "Final Report" }];

export default function RatingLayout({
  rating,
  linkTo,
  Fetcher,
  isClientOnly = false,
  SupervisorObject,
  PrimaryAnalystObject,
  SecondaryAnalystObject,
}: RatingProps) {
  const navigate = useNavigate();
  const ratingRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [reportType, setReportType] = useState<string>("");
  const [reportVersion, setReportVersion] = useState<string>("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const FetcherData = Fetcher?.data as { message: string; error: string };
  const isSubmitting = Fetcher.state === "submitting";
  const [forAMI, setForAMI] = useState(false);

  const getVersion = (name: string) => {
    const thisReports = rating?.reportModel?.filter(
      (el) => el.reportTitle === name
    );
    return thisReports?.length ? thisReports.length + 1 : 1;
  };
 
  const onUploadHandler = (name: string) => {
    if (name === "Draft Report") {
      const version = getVersion(name);
      setReportType(name);
      setReportVersion(`v${version}.0`);
    }

    if (name === "Final Report") {
      const version = getVersion(name);
      if (!rating?.issueDate || !rating?.expiryDate || !rating?.ratingClass) {
        // console.log(`/app/ratings/${rating?.id}/edit-rating`);
        window.location.href = `/app/ratings/${rating?.id}/edit-rating`;
        //toast.error("Please fill in the required fields before uploading the final report", { toastId: "error" });
        return;
      }
      setReportType(name);
      setReportVersion(`v${version}.0`);
    }

    ratingRef.current?.showModal();
  };

  if (reportType?.includes("Final")) {
    //update rating status to concluded
  }

  const onCloseHandler = () => ratingRef.current?.close();

  useEffect(() => {
    if (FetcherData?.error)
      toast.error(FetcherData?.error, { toastId: "error" });
    if (FetcherData?.message)
      toast.success(FetcherData?.message, { toastId: "success" });
    formRef.current?.reset();
    onCloseHandler();
  }, [FetcherData]);

  const hasFinalReport = rating?.reportModel?.some(
    (report) => report?.reportTitle === "Final Report"
  );
  /*   useEffect(() => {
    ratingRef.current?.showModal();
  }, []);
 */
  console.log(rating, "I want to see if I can see receipt");

  return (
    <div className="flex flex-col flex-1 h-full gap-6 overflow-auto">
      <div className="flex items-end justify-between pt-6">
        <div className="flex flex-col items-start">
          {/* <h1 className="text-3xl font-bold capitalize">
            {rating?.ratingTitle}
          </h1> */}
          <span
            className={`px-4 py-1 text text-white capitalize rounded-full ${rating?.status}`}
          >
            {rating?.status}
          </span>
        </div>

        {isClientOnly ? (
          <div className="dropdown dropdown-hover dropdown-end">
            {/* <Link tabIndex={0} to="#" className="text-base btn btn-secondary">
              Upload Files
              <i className="ri-arrow-down-s-line" />
            </Link> */}
            {rating?.status === "ongoing" && (
              <Link tabIndex={0} to="#" className="text-base btn btn-secondary">
                Upload Files
                <i className="ri-arrow-down-s-line" />
              </Link>
            )}

            <ul
              tabIndex={0}
              className="rounded-lg p-4 text-sm shadow-lg dropdown-content bg-base-100 w-[18em] z-[10] mr-1"
            >
              <li>
                {rating?.requireQuestionnaireFiles ? (
                  <Link
                    to={`${linkTo}/questionnaire-docs`}
                    className="flex items-center gap-2 py-4 hover:bg-secondary hover:text-base-100 hover:px-2"
                  >
                    <i className="ri-file-text-line" />
                    Questionnaire Documents
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 py-4 opacity-40">
                    <i className="ri-file-text-line" />
                    Questionnaire Documents
                  </span>
                )}
              </li>

              <li>
                {rating?.requireAdditionalFiles ? (
                  <Link
                    to={`${linkTo}/additional-docs`}
                    className="flex items-center gap-2 py-4 hover:bg-secondary hover:text-base-100 hover:px-2"
                  >
                    <i className="ri-file-paper-line" />
                    Additional Documents
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 py-4 opacity-40">
                    <i className="ri-file-text-line" />
                    Additional Documents
                  </span>
                )}
              </li>
            </ul>
          </div>
        ) : (
          <Link to={linkTo} className="text-base btn btn-secondary">
            View Files
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="p-4 text-sm font-bold text-white uppercase bg-primary">
                Summary
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <SummaryCard
                  title="Rating Score"
                  isLarge
                  subTitle={`${rating?.ratingScore || "-"}`}
                />
                <SummaryCard
                  title="Rating Year"
                  isLarge
                  subTitle={`${rating?.ratingYear || ""}`}
                />
                <SummaryCard
                  title="Issue Date"
                  subTitle={
                    !rating?.issueDate
                      ? "-"
                      : dayjs(rating?.issueDate).format("MMMM DD, YYYY")
                  }
                />
                <SummaryCard
                  title="Expiry Date"
                  subTitle={
                    !rating?.expiryDate
                      ? "-"
                      : dayjs(rating?.expiryDate).format("MMMM DD, YYYY")
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="p-4 text-sm font-bold text-white uppercase bg-primary">
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <SummaryCard
                  title="Primary Analyst"
                  // {...(rating?.primaryAnalyst && {subTitle: rating.primaryAnalyst})}
                  subTitle={rating?.primaryAnalyst || "-"}
                  // {...(rating?.primaryAnalystEmail && { subSubTitle: rating.primaryAnalystEmail })}
                  subSubTitle={rating?.primaryAnalystEmail || "-"}
                />

                <SummaryCard
                  title="Secondary Analyst"
                  subTitle={rating?.secondaryAnalyst || "-"}
                  subSubTitle={rating?.secondaryAnalystEmail || "-"}
                  // {...(rating?.primaryAnalystEmail && {
                  //   subSubTitle: rating.primaryAnalystEmail,
                  // })}
                />

                <div className="col-span-2 ">
                  <SummaryCard
                    title="Address"
                    subTitle="  UBA House (5th Floor)
                57 Marina, Lagos-Island
                Lagos, Nigeria"
                    subSubTitle="info@agusto.com | 01-2707222-3"
                  />
                </div>
                {/* <SummaryCard title="Rating Class" subTitle={rating?.ratingClassModel?.name || '-'} /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[25em] flex flex-col h-full">
          <div className="flex items-center justify-between p-4 rounded bg-primary">
            <h2 className="text-sm font-bold text-white uppercase">Reports</h2>
          </div>
          <div className="p-4 border rounded bg-base-100 border-accent min-h-[20vh]">
            <ul>
              <Tr
                name="Report Name"
                version="Version"
                status="Status"
                isHeader
              />
              {rating?.reportModel?.map((report, i) => (
                <React.Fragment key={report?.id}>
                  <Tr
                  key={report?.id}
                  index={i + 1}
                  name={report?.reportTitle}
                  version={report?.version}
                  status={report?.status}
                  link={report?.reportFileUrl || ""}
                />
                 {report?.finalLetterUrl && (
                <Tr
                  index={i + 1} // Keep the same index since it's part of the same Final Report
                  name="Final Letter"
                  version={report?.version}
                 status={report?.status}
                 link={report?.finalLetterUrl}
                />
                )}
                  </React.Fragment>
                ))}
                
              
            </ul>
            <div
              className={`flex flex-col md:flex-row items-center ${
                !isClientOnly && rating?.status === "ongoing" && hasFinalReport
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              {!isClientOnly && rating?.status === "ongoing" && (
                <div className="flex justify-center">
                  <div className="flex justify-end dropdown dropdown-end">
                    <button
                      tabIndex={1}
                      className="mt-6 text-sm border btn btn-secondary border-secondary"
                    >
                      Upload Report
                      <i className="ri-arrow-down-s-line" />
                    </button>

                    <ul
                      tabIndex={1}
                      className="rounded-lg p-4 text-sm shadow-lg dropdown-content border bg-base-100 w-[18em] z-[10] mr-1"
                    >
                      {reportUploadMenu?.map((el, i) => (
                        <li key={i} onClick={() => onUploadHandler(el.name)}>
                          <a
                            href="#"
                            className="flex items-center gap-2 py-4 hover:text-secondary hover:px-2"
                          >
                            <i className="ri-file-text-line" />
                            {el?.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {!isClientOnly &&
                rating?.status === "ongoing" &&
                hasFinalReport && (
                  <div className="flex mt-6">
                    <div
                      className="btn btn-secondary"
                      onClick={() => setShowStatusModal(true)}
                    >
                      Update Status
                    </div>
                  </div>
                )}
              {showStatusModal && (
                <UpdateStatus onClose={() => setShowStatusModal(false)} />
              )}
            </div>
          </div>
          <div className="p-4 mt-4 border rounded bg-primary border-accent">
            <h2 className="text-sm font-bold text-white uppercase ">
              Download Resources
            </h2>
          </div>

          <div className="border rounded border-accent relative">
            <ul className="grid grid-cols-2 gap-2">
              <li className="p-4 bg-base-100">
                <a
                  href={`${rating?.methodologyModel?.url}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-2 text-sm link-secondary"
                >
                  <i className="ri-file-text-line" />
                  Methodology
                </a>
              </li>

              <li className="p-4 bg-base-100">
                <a
                  href={`${rating?.questionnaireModel?.url}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-2 text-sm link-secondary"
                >
                  <i className="ri-file-text-line" />
                  Questionnaire
                </a>
              </li>
              {rating.loeModel && (
                <li className="p-4 bg-base-100">
                  <a
                    href={`${rating?.loeModel?.url}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-2 text-sm link-secondary"
                  >
                    <i className="ri-file-text-line" />
                    Letter of Engagement
                  </a>
                </li>
              )}

              {rating?.invoiceModel && (
                <li className="p-4 bg-base-100 flex gap-4 relative">
                  <a
                    href={`${rating?.invoiceModel?.url}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-2 text-sm link-secondary"
                  >
                    <i className="ri-file-text-line" />
                    Invoice
                  </a>
                  {!isClientOnly && rating?.reportModel?.length === 0 && (
                    <i
                      className="ri-edit-line cursor-pointer text-secondary"
                      onClick={() => setShowInvoiceModal(true)}
                    />
                  )}
                </li>
              )}
              { rating?.invoice && rating?.reportModel?.length === 0 && (
                <li className="p-4 bg-base-100 flex gap-4 text-sm relative text-secondary cursor-pointer"
                 onClick={() => setShowReceiptModal(true)}>
             
                  <i className="ri-file-text-line link-secondary" />
                  Receipt
                  <i
                    className="ri-edit-line cursor-pointer text-secondary"
                    
                  />
              
              </li>
            )}
            </ul>
            {showInvoiceModal && (
              <EditInvoice onClose={() => setShowInvoiceModal(false)} />
            )}
            {showReceiptModal && (
              <AddReceipt onClose={() => setShowReceiptModal(false)} />
            )}
            
          </div>
        </div>
      </div>

      {!isClientOnly && (
        <dialog ref={ratingRef} id="my_modal_2" className="modal">
          <Fetcher.Form
            ref={formRef}
            method="patch"
            encType="multipart/form-data"
          >
            <fieldset
              disabled={isSubmitting}
              className="p-10 flex flex-col gap-6 bg-base-100 w-[30em] rounded"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-bold text-center uppercase text-primary">
                  {reportType} Upload
                </h2>
                <i
                  className="text-2xl cursor-pointer ri-close-circle-line text-secondary"
                  onClick={onCloseHandler}
                />
              </div>
              <input
                type="hidden"
                required
                name="contacts"
                defaultValue={JSON.stringify(rating?.contacts)}
              />
              <input
                type="hidden"
                required
                name="client"
                defaultValue={rating?.clientModel?.companyName}
              />
              <input
                type="hidden"
                required
                name="year"
                defaultValue={rating?.ratingYear}
              />
              <input
                type="hidden"
                required
                name="title"
                defaultValue={rating?.ratingTitle}
              />
              <input
                type="hidden"
                required
                name="reportTitle"
                defaultValue={reportType}
              />
              <input
                type="hidden"
                required
                name="version"
                defaultValue={reportVersion}
              />
              <input
                type="hidden"
                required
                name="supervisorId"
                defaultValue={SupervisorObject?.employee_id}
              />
              <input
                type="hidden"
                required
                name="supervisorEmail"
                defaultValue={SupervisorObject?.email}
              />
              <input
                type="hidden"
                required
                name="primaryAnalystId"
                defaultValue={PrimaryAnalystObject?.employee_id}
              />
              <input
                type="hidden"
                required
                name="secondaryAnalystId"
                defaultValue={SecondaryAnalystObject?.employee_id}
              />
              {/* //we still need to fix the upload to ami feature
              {reportType === "Final Report" && (
                <div className="flex items-center gap-2">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="checkbox checkbox-secondary"
                    onChange={() => setForAMI(!forAMI)}
                  />
                  <label
                    htmlFor="checkbox"
                    className="text-sm cursor-pointer hint"
                  >
                    Upload to AMI ?
                  </label>
                </div>
              )} */}

              <div>
                <label htmlFor="file" className="text-sm hint">
                  {reportType} File
                </label>
                <input
                  type="file"
                  required
                  name="file"
                  className="w-full file-input file-input-bordered"
                  accept="application/pdf"
                />
              </div>

              {reportType === "Final Report" && (
                <div>
                  <label htmlFor="file" className="text-sm hint">
                    Final Letter (Signed)
                  </label>
                  <input
                    required
                    type="file"
                    name="finalLetter"
                    className="w-full file-input file-input-bordered"
                    accept="application/pdf"
                  />
                </div>
              )}

              {/* {reportType === "Final Report" && forAMI && (
                <div>
                  <label htmlFor="file" className="text-sm hint">
                    Customer Consent Document (Signed)
                  </label>
                  <input
                    required
                    type="file"
                    name="consentLetter"
                    className="w-full file-input file-input-bordered"
                    accept="application/pdf"
                  />
                </div>
              )} */}

              {/* {reportType === "Final Report" && (
                <div>
                  <label htmlFor="status" className="text-sm hint">
                    Status
                  </label>
                  <select
                    required
                    name="status"
                    className="w-full select select-bordered"
                    defaultValue={rating?.status}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="concluded">Concluded</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )} */}

              <button className="btn btn-secondary">
                {isSubmitting && <span className="loading loading-xs"></span>}
                UPLOAD
              </button>
            </fieldset>
          </Fetcher.Form>
        </dialog>
      )}
    </div>
  );
}

const Tr = ({
  name,
  version,
  link,
  action,
  status,
  isHeader,
  index,
}: {
  name: string;
  version: string;
  status: string;
  link?: string;
  action?: string;
  isHeader?: boolean;
  index?: number;
}) => {
  const isEvenStyle = index && index % 2 === 0;
  return (
    <li
      className={`grid items-center grid-cols-4 text-sm ${
        isHeader && "font-bold uppercase bg-accent"
      } border-b border-accent ${isEvenStyle && "bg-gray-100"}`}
    >
      <div className="h-full col-span-2 px-2 py-3 ">{name}</div>
      <Link
        to={`${link}`}
        target="_blank"
        referrerPolicy="no-referrer"
        className={`py-3 text-center p-x2  border-l border-r ${
          !isHeader && "link text-secondary"
        }`}
      >
        {version}
      </Link>
      <div
        className={`text-sm text-center ${
          status === "pending" &&
          "font-bold text-secondary underline cursor-pointer"
        }`}
      >
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </div>
    </li>
  );
};

const SummaryCard = ({
  title,
  subTitle,
  subSubTitle,
  isLarge,
}: {
  title: string;
  subTitle?: string;
  subSubTitle?: string;
  isLarge?: boolean;
}) => (
  <div className="flex flex-col gap-1 px-4 py-3 shadow bg-base-100">
    <p className="text-sm font-bold capitalize opacity-60 ">{title}</p>
    {subSubTitle && <h2 className="font-medium opacity-90">{subSubTitle}</h2>}
    <h2
      className={` font-bold opacity-90 ${
        isLarge ? "text-[20px]" : "text-[14px]"
      }`}
    >
      {subTitle}
    </h2>
  </div>
);
