import axios from 'axios';
import dayjs from 'dayjs';
import RatingsSummaryCard from '@ui/cards/rating-summary-card';
import { Accordion, Avatar } from '@components';
import { Duplex } from 'stream';
import { NavLink, useFetcher, useLoaderData } from '@remix-run/react';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { validateCookie } from '@helpers/cookies';
import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  UploadHandler,
} from '@remix-run/node';
import fs from 'node:fs';

interface IResponse {
  response: string;
  Questions: string;
  SubQuestions: string;
  Header: string;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);

  const ratingQuery = await RMSservice(token)
    .ratings.one({
      id,
    })
    .then((res) => {
      const { rating, error } = res || {};
      const { responses, ...rest } = rating || {};
      const allResponses = responses as any;

      //group responses by Header into IResponse
      const groupedResponses = allResponses.reduce((acc: any, response: any) => {
        const { Header } = response;
        if (!acc[Header]) acc[Header] = [];

        acc[Header].push(response);
        return acc;
      }, {});

      return { rating: rest, error, responses: groupedResponses };
    });

  return json({ ratingQuery });
};

export async function action({ request }: ActionFunctionArgs) {
  const { storedUrl, error } = await uploadFileHandler(request);
  return json({ storedUrl, error });
}

export default function Rating() {
  const Fetcher = useFetcher();
  const FetcherData = Fetcher.data as { storedUrl: string; error: string };
  const UploadRef = useRef<HTMLDialogElement>(null);
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [fileName, setFileName] = useState<string | null>(null);
  const isSubmitting = Fetcher.state === 'submitting';

  const onUpload = async (name: string) => {
    setFileName(name);
    UploadRef.current?.showModal();
  };

  useEffect(() => {
    if (FetcherData?.storedUrl) {
      toast.success('File uploaded successfully');
      UploadRef.current?.close();
    }

    if (FetcherData?.error) toast.error(FetcherData?.error);
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden" style={{ overflow: 'hidden' }}>
      <header className="flex h-[50px] items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">{ratingQuery?.rating?.clientModel?.companyName}</h1>
          <p className="text-sm font-normal opacity-70">{ratingQuery?.rating?.ratingTitle}</p>
          {Fetcher?.data?.storedUrl && (
            <a href={Fetcher?.data?.storedUrl} target="_blank">
              Download
            </a>
          )}
        </div>

        {ratingQuery?.rating?.status && (
          <div>
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline btn-secondary btn-sm">
                <i className="ri-upload-cloud-line" />
                Upload Report
                <i className="ri-arrow-down-s-fill" />
              </button>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-secondary w-52">
                <li className="text-white">
                  <button onClick={() => onUpload('draft-report')}>
                    <i className="ri-file-pdf-line" />
                    Draft Report
                  </button>
                </li>

                <li className="text-white">
                  <button onClick={() => onUpload('final-report')}>
                    <i className="ri-file-pdf-line" />
                    Final Report
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <aside className="flex items-start justify-between gap-4 overflow-hidden">
        <div className="flex-1 h-full pb-10 overflow-auto text-sm bg-base-200">
          {Object.keys(ratingQuery?.responses).map((response, i) => (
            <Accordion key={i} title={response} data={ratingQuery?.responses[response]} defaultChecked={i === 0} />
          ))}
        </div>

        <div className="w-[20em] flex flex-col gap-2 ">
          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex items-center justify-between flex-1 py-3 border-b">
              <h2 className="text-xs font-bold uppercase">Summary</h2>
              <span className={`${ratingQuery?.rating?.status} capitalize text-xs`}>{ratingQuery?.rating?.status}</span>
            </div>

            <RatingsSummaryCard title="Rating Class" subTitle={ratingQuery?.rating?.ratingClassModel?.name || '-'} />

            <RatingsSummaryCard
              title="Issue Date"
              subTitle={
                !ratingQuery?.rating?.issueDate ? '-' : dayjs(ratingQuery?.rating?.issueDate).format('MMMM DD, YYYY')
              }
            />

            <RatingsSummaryCard
              title="Expiry Date"
              subTitle={
                !ratingQuery?.rating?.expiryDate ? '-' : dayjs(ratingQuery?.rating?.expiryDate).format('MMMM DD, YYYY')
              }
            />
          </div>

          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex-1 py-3 border-b">
              <h2 className="text-xs font-bold uppercase">Resources</h2>
            </div>

            <ul className="py-4">
              <li>
                <a href={`${ratingQuery?.methodologyModel?.id}`} className="text-sm link-secondary">
                  Methodology
                </a>
              </li>
            </ul>
          </div>
        </div>

        <dialog className="modal" ref={UploadRef}>
          <Fetcher.Form method="post" encType="multipart/form-data">
            <fieldset disabled={isSubmitting} className="flex flex-col flex-1 gap-6 p-8 rounded-lg shadow bg-base-100">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold">Select File</h1>
                  <p className="text-xs opacity-70">Select the file you want to upload</p>
                </div>

                <i
                  role="button"
                  onClick={() => UploadRef.current?.close()}
                  className="text-2xl cursor-pointer ri-close-circle-fill text-secondary hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-2 ">
                <input type="hidden" name="fileName" defaultValue={`${fileName}`} />
                <input name="file" type="file" className="file-input-primary file-input input-bordered " required />

                <button className="gap-2 text-base btn btn-secondary">
                  Upload
                  {isSubmitting && (
                    <div className="h-4 w-4 rounded-full animate-spin border-l-[#fff5] border-[3px] border-#fff"></div>
                  )}
                </button>
              </div>
            </fieldset>
          </Fetcher.Form>
        </dialog>
      </aside>

      {/* <div className="flex h-full gap-4 overflow-hidden ">
        <div className="flex-1 h-[20%] pb-10 overflow-auto bg-base-200 text-sm">
          {Object.keys(ratingQuery?.responses).map((response, i) => (
            <Accordion key={i} title={response} data={ratingQuery?.responses[response]} defaultChecked={i === 0} />
          ))}
        </div>

        <div className="w-[20em] flex flex-col gap-4 ">
          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex justify-between flex-1 py-3 border-b">
              <h1 className="font-bold">Summary</h1>
              <span className={`${ratingQuery?.rating?.status} capitalize`}>{ratingQuery?.rating?.status}</span>
            </div>

            <RatingsSummaryCard title="Rating Class" subTitle={ratingQuery?.rating?.ratingClassModel?.name || '-'} />

            <RatingsSummaryCard
              title="Issue Date"
              subTitle={
                !ratingQuery?.rating?.issueDate ? '-' : dayjs(ratingQuery?.rating?.issueDate).format('MMMM DD, YYYY')
              }
            />

            <RatingsSummaryCard
              title="Expiry Date"
              subTitle={
                !ratingQuery?.rating?.expiryDate ? '-' : dayjs(ratingQuery?.rating?.expiryDate).format('MMMM DD, YYYY')
              }
            />
          </div>

          <div className="p-4 border rounded bg-base-100 border-accent">
            <div className="flex-1 py-3 border-b">
              <h1 className="font-bold">Resources</h1>
            </div>

            <ul className="py-4">
              <li>
                <a href={`${ratingQuery?.methodologyModel?.id}`} className=" link-secondary">
                  Methodology
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <dialog className="modal" ref={UploadRef}>
        <Fetcher.Form method="post" encType="multipart/form-data">
          <fieldset disabled={isSubmitting} className="flex flex-col flex-1 gap-6 p-8 rounded-lg shadow bg-base-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">Select File</h1>
                <p className="text-xs opacity-70">Select the file you want to upload</p>
              </div>

              <i
                role="button"
                onClick={() => UploadRef.current?.close()}
                className="text-2xl cursor-pointer ri-close-circle-fill text-secondary hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="hidden" name="fileName" defaultValue={`${fileName}`} />
              <input name="file" type="file" className="file-input-primary file-input input-bordered" required />

              <button className="gap-2 text-base btn btn-secondary">
                Upload
                {isSubmitting && (
                  <div className="h-4 w-4 rounded-full animate-spin border-l-[#fff5] border-[3px] border-#fff"></div>
                )}
              </button>
            </div>
          </fieldset>
        </Fetcher.Form>
      </dialog> */}
    </div>
  );
}
