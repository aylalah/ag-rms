import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import numeral from "numeral";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const allowFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/zip",
  "application/rar",
  "text/csv",
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token, client } = await validateCookie(request);

  //get the companyName from client

  const id = params.id || "testing";
  const slug = params.slug as "questionnaire-docs" | "additional-docs";
  const { rating, error } = await RMSservice(token).ratings.one({ id });

  let docs = [] as FileProp[];

  if (slug === "questionnaire-docs" && rating?.questionnaireFiles)
    docs = JSON.parse(rating.questionnaireFiles);
  if (slug === "additional-docs" && rating?.additionalFiles)
    docs = JSON.parse(rating.additionalFiles);
  return json({ error, rating, docs });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { token, client } = await validateCookie(request);

  const method = request.method;
  const id = params.id || "testing";
  const slug = params.slug as "questionnaire-docs" | "additional-docs";

  const { rating, error } = await RMSservice(token).ratings.one({ id });
  const company = rating?.clientModel?.companyName;
  const ratingname = rating?.ratingTitle;

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      avoidFileConflicts: true,
      directory: "/tmp",
      maxPartSize: 30_000_000,
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );
  const appUrl = process.env.ROOT_URL;
  if (method === "POST") {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    )
      .then(async (res) => {
        const files = Object.fromEntries(res.entries());

        const supervisor = files.supervisor as string;
        const primaryAnalyst = files.primaryAnalyst as string;
        const secondaryAnalyst = files.secondaryAnalyst as string;

        if (Object.keys(files).length < 1) return json({});

        const saveFiles = await Promise.all(
          Object.entries(files).map(async ([key, file]) => {
            const fileData = file as {
              name: string;
              type: string;
              size: number;
            };
            const fileName = fileData?.name;
            const name = `${id}/${fileName?.replace(/\s/g, "-")}`.toLowerCase();
            const upload = await uploadStreamToSpaces(file, name);

            if (upload?.$metadata?.httpStatusCode === 200) {
              return {
                name: fileName,
                storedUrl: upload?.Location,
                status: true,
                id: key,
              };
            }

            return { storedUrl: null, status: false, id: key };
          })
        );

        const fileList = saveFiles
          .filter((file) => file?.name !== undefined)
          .map((el, index) => `${index + 1}. ${el?.name} <br/> <br/>`)
          .join("\n");

        sendEmailService({
          From: "info@agusto.com",
          To: primaryAnalyst,
          Cc: `${supervisor},${secondaryAnalyst}`,

          Subject: "Client File Upload",
          HtmlBody: `${company} just uploaded the following file${
            fileList.length > 1 ? "s" : ""
          } for ${ratingname}.<br/><br/> </n> ${fileList.toString()} </n> You can view the file${
            fileList.length > 1 ? "s" : ""
          } on the <strong>Rating Management System</strong> </n> <br/> ${appUrl}`,
        });

        return json({ saveQuery: saveFiles });
      })
      .catch((error) => json({ error }));

    return formData;
  }

  if (method === "PATCH") {
    const fd = await request.formData();
    const data = Object.fromEntries(fd.entries()) as any;
    if (slug === "questionnaire-docs") data.questionnaireFiles = data.docs;
    if (slug === "additional-docs") data.additionalFiles = data.docs;
    delete data.docs;

    const { updateRating, error } = await RMSservice(token).ratings.update({
      id,
      data,
    });
    return json({ message: updateRating, error });
  }

  if (method === "DELETE") {
    const fd = await request.formData();
    const url = fd.get("url") as string;
    const fileName = url?.split("/").pop();
    const { message, error } = await deleteFileFromSpaces(
      `${id}/${fileName}` || ""
    );
    return json({ deletedMessage: message, error, url });
  }

  return json({ error: "Invalid request method" });
};

export default function Dragger() {
  const DiaRef = useRef<HTMLDialogElement>(null);
  const { rating, docs } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();
  const isSubmitting = Fetcher.state === "submitting";
  const FetcherData = Fetcher.data as {
    error: string;
    url: string;
    message: string;
    deletedMessage: string;
    saveQuery: {
      id: string;
      storedUrl: string | null;
      status: boolean;
      fileName: string;
    }[];
  };
  const dragRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<FileProp[]>(docs as any);
  const [totalSize, setTotalSize] = useState(0);
  const [selectedFile, setSelectedFile] = useState<FileProp | null>(null);

  const sumSizes = () => {
    const size = fileList?.reduce((acc, file) => acc + file.size, 0);
    return size / 1000000;
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    try {
      event.preventDefault();
      const files = event?.dataTransfer?.files;
      onUploadFiles(files);
    } catch (error) {}
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current?.style.setProperty("background", "#07354f20");
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current?.style.setProperty("border", "none");
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files?.length > 0) onUploadFiles(files);
  };

  const onUploadFiles = (files: FileList) => {
    let size = 0;
    const payload = [];
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const key = randomString(10);
      const fileType = files[i].type;
      const shouldAllow = allowFileTypes.includes(fileType);

      payload.push({
        id: key,
        name: files[i].name,
        size: files[i].size,
        status: false,
        shouldAllow,
        url: "",
        date: new Date(),
      });

      if (allowFileTypes.includes(files[i].type)) {
        size += files[i].size;
        formData.append(key, files[i]);
      }
    }

    setTotalSize(size);
    setFileList([...fileList, ...payload]);

    //check if formData is empty
    if (formData.entries().next().done) return;

    const SupervisorAnalystObject = JSON.parse(rating?.supervisor as any);
 
    const PrimaryAnalystObject = JSON.parse(rating?.primaryAnalyst as any);
   
    const SecondaryAnalystObject = JSON.parse(rating?.secondaryAnalyst as any);

    formData.append("supervisor", SupervisorAnalystObject?.email as string);
    formData.append("primaryAnalyst", PrimaryAnalystObject?.email as string);
    formData.append(
      "secondaryAnalyst",
      SecondaryAnalystObject?.email as string
    );

    Fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  const onSubmit = (data: FileProp[]) => {
    //remove should not allow
    const newFileList = data.filter((file) => file.shouldAllow);
    Fetcher.submit({ docs: JSON.stringify(newFileList) }, { method: "PATCH" });
  };

  const onDeleteStart = (file: FileProp) => {
    setSelectedFile(file);
    DiaRef.current?.showModal();
  };

  const onDelete = () => {
    Fetcher.submit({ url: selectedFile?.url || "" }, { method: "DELETE" });
  };

  useEffect(() => {
    if (FetcherData?.saveQuery) {
      const saveQuery = FetcherData?.saveQuery;
      const newFileList = fileList.map((file) => {
        const found = saveQuery.find((query) => query.id === file.id);
        if (found)
          return {
            ...file,
            status: found.status,
            url: found?.storedUrl || "",
            date: new Date(),
          };

        return file;
      });
      setFileList(newFileList);
      onSubmit(newFileList);
    }

    if (FetcherData?.message) {
      DiaRef.current?.close();
      toast.success(FetcherData?.message, { toastId: "success-message" });
    }

    if (FetcherData?.deletedMessage) {
      const newFileList = fileList.filter(
        (file) => file.url !== FetcherData?.url
      );
      setFileList(newFileList);
      onSubmit(newFileList);
    }

    if (FetcherData?.error) {
      toast.error(FetcherData?.error, { toastId: "error" });
    }
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-[98%] gap-10 overflow-hidden border-b-2 ">
      <div
        className="border-dashed flex flex-col items-center justify-center h-[17em]  overflow-hidden transition-all border bg-[#07354f10] rounded-xl border-primary"
        ref={dragRef}
        id="drop_zone"
        onDrop={onDrop}
        onDragOver={dragOverHandler}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragEnd={onDragLeave}
        draggable={!isSubmitting}
      >
        <p className="text-sm">
          Drag your documents here to start uploading. <br />
        </p>

        <div className="flex items-center justify-center w-full gap-4 my-4 opacity-40">
          <div className="w-24 h-0.5 bg-gray-500"></div>
          <p>OR</p>
          <div className="w-24 h-0.5 bg-gray-500"></div>
        </div>

        <div className="relative w-44">
          <button className="w-full text-sm shadow btn btn-secondary">
            Select File(s)
          </button>
          <input
            onChange={onChangeFileInput}
            type="file"
            accept="application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <h2 className="flex justify-between p-4 pr-6 font-semibold text-white capitalize bg-primary">
          <span>
            {fileList?.length} File{fileList?.length > 1 ? "s" : ""}
          </span>
          <span>{numeral(sumSizes()).format("0,00.00")} MB</span>
        </h2>

        <div className="flex-1 pr-6 overflow-auto rounded-lg bg-base-200">
          {fileList &&
            Array.from(fileList).map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b "
              >
                <div className="flex items-center flex-1 gap-4">
                  {file?.status && (
                    <i className="text-xl text-green-600 ri-checkbox-circle-fill" />
                  )}
                  {!file?.shouldAllow && (
                    <i className="text-xl text-red-600 ri-close-circle-fill" />
                  )}
                  {!file?.status && file.shouldAllow && (
                    <span className="loading loading-sm" />
                  )}

                  <p
                    className={`${
                      !file?.shouldAllow && "text-red-500"
                    } text-sm`}
                  >
                    <Link
                      target="_blank"
                      referrerPolicy="no-referrer"
                      to={file?.url}
                      className="link"
                    >
                      {file.name}
                    </Link>
                  </p>
                </div>

                <div className="flex items-center gap-8 text-sm">
                  <p className={`${!file?.shouldAllow && "text-red-500"}`}>
                    {file?.size &&
                      numeral(file.size / 1000000).format("0,00.00")}{" "}
                    MB
                  </p>

                  <p
                    role="button"
                    className={`${
                      !file?.shouldAllow && "text-red-500"
                    } cursor-pointer`}
                    onClick={() => onDeleteStart(file)}
                  >
                    <i className="text-lg ri-close-fill text-secondary" />
                  </p>
                </div>
              </div>
            ))}

          {fileList && Array.from(fileList).length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">No files uploaded yet</p>
              <p className="text-sm text-gray-500">
                Uploaded files will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      <dialog ref={DiaRef} className="dialog">
        <div className="p-10 rounded-lg bg-base-100">
          <h3 className="text-lg font-bold">Delete File</h3>
          <p className="py-2">Are you sure you want to delete this file?</p>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              disabled={isSubmitting}
              className="btn btn-sm"
              onClick={() => DiaRef.current?.close()}
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              onClick={onDelete}
              className="btn btn-sm btn-secondary"
            >
              Delete
              {isSubmitting && <span className="loading loading-sm"></span>}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
