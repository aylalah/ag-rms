import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import numeral from "numeral";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JSZip from "jszip";
import pkg from "file-saver";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  const id = params.id || "testing";
  const slug = params.slug as "questionnaire-docs" | "additional-docs";
  const { rating, error } = await RMSservice(token).ratings.one({ id });
  let ratingFiles = [];

  if (rating?.questionnaireFiles && slug === "questionnaire-docs") {
    ratingFiles = JSON.parse(rating?.questionnaireFiles) || [];
  }

  if (rating?.additionalFiles && slug === "additional-docs") {
    ratingFiles = JSON.parse(rating?.additionalFiles) || [];
  }

  return json({ error, slug, rating, id, ratingFiles });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { token } = await validateCookie(request);
  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });
  const id = params?.id as string;
  const fd = await request.formData();
  const body = Object.fromEntries(fd) as any;

  //convert to boolean
  body.requireQuestionnaireFiles = body.requireQuestionnaireFiles === "true";
  body.requireAdditionalFiles = body.requireAdditionalFiles === "true";

  const { updateRating, error } = await RMSservice(token).ratings.update({
    id,
    data: body,
  });
  return json({ updateRating, error });
};

const tabs = [
  {
    name: "Questionnaire Documents",
    slug: "questionnaire-docs",
    icon: "ri-file-3-line",
  },
  {
    name: "Additional Documents",
    slug: "additional-docs",
    icon: "ri-file-2-line",
  },
];

const acceptOptions = {
  "questionnaire-docs": [
    { name: "Disable Questionnaire Upload" },
    { name: "Enable Questionnaire Upload" },
  ],
  "additional-docs": [
    { name: "Disable Additional Docs Upload" },
    { name: "Enable Additional Docs Upload" },
  ],
};

export default function UploadedFiles() {
  const { rating, error, slug, id, ratingFiles } =
    useLoaderData<typeof loader>();
  const [allFiles, setAllFiles] = useState<FileProp[] | null>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const Fetcher = useFetcher();
  const FetcherData = Fetcher.data as { updateRating: boolean; error: string };

  const removeExtension = (value: string) => {
    if (!value) return "";
    return value.split(".").slice(0, -1).join(".");
  };

  const onSearch = (value: string) => {
    if (!value) return setAllFiles(ratingFiles as any);
    const rawFiles = (ratingFiles as any as FileProp[]) || [];
    const filtered = rawFiles.filter((el) =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );
    setAllFiles(filtered as any);
  };

  // const onAcceptAction = (value: string) => {
  //   if (value === "Disable Questionnaire Upload") {
  //     const confirm = window.confirm(
  //       "Are you sure you want to accept this questionnaire?"
  //     );
  //     if (!confirm) return;
  //     Fetcher.submit({ requireQuestionnaireFiles: false }, { method: "patch" });
  //   }

  //   if (value === "Enable Questionnaire Upload") {
  //     const confirm = window.confirm(
  //       "Are you sure you want to request questionnaire info?"
  //     );
  //     if (!confirm) return;
  //     Fetcher.submit({ requireQuestionnaireFiles: true }, { method: "patch" });
  //   }

  //   if (value === "Disable Additional Docs Upload") {
  //     const confirm = window.confirm(
  //       "Are you sure you want to accept this additional info?"
  //     );
  //     if (!confirm) return;
  //     Fetcher.submit({ requireAdditionalFiles: false }, { method: "patch" });
  //   }

  //   if (value === "Enable Additional Docs Upload") {
  //     const confirm = window.confirm(
  //       "Are you sure you want to request additional info?"
  //     );
  //     if (!confirm) return;
  //     Fetcher.submit({ requireAdditionalFiles: true }, { method: "patch" });
  //   }
  // };

  //download files section
  const onAcceptAction = (value: string) => {
    if (!rating) return;
  
    const confirm = window.confirm(`Are you sure you want to ${value.toLowerCase()}?`);
    if (!confirm) return;
  
    // Preserve existing values and only update the relevant one
    const update = {
      requireQuestionnaireFiles: rating.requireQuestionnaireFiles,
      requireAdditionalFiles: rating.requireAdditionalFiles,
    };
  
    if (value === "Disable Questionnaire Upload") {
      update.requireQuestionnaireFiles = false;
    } else if (value === "Enable Questionnaire Upload") {
      update.requireQuestionnaireFiles = true;
    } else if (value === "Disable Additional Docs Upload") {
      update.requireAdditionalFiles = false;
    } else if (value === "Enable Additional Docs Upload") {
      update.requireAdditionalFiles = true;
    }
  
    Fetcher.submit(update, { method: "patch" });
  };
  
  const { saveAs } = pkg;

  const toggleFileSelection = (fileUrl: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileUrl)
        ? prev.filter((url) => url !== fileUrl)
        : [...prev, fileUrl]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === allFiles?.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(allFiles ? allFiles.map((file) => file.url) : []);
    }
  };

  const downloadFiles = async () => {
    if (selectedFiles.length === 1) {
      window.open(selectedFiles[0], "_blank");
    } else if (selectedFiles.length > 1) {
      const zip = new JSZip();
      const promises = selectedFiles.map(async (fileUrl) => {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const fileName = fileUrl.split("/").pop();
        if (fileName) zip.file(fileName, blob);
      });
      await Promise.all(promises);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "selected-files.zip");
    }
  };

  useEffect(() => {
    setAllFiles(() => [...ratingFiles]);
  }, []);

  useEffect(() => {
    if (FetcherData?.error) toast.error(FetcherData?.error);
    if (FetcherData?.updateRating) toast.success("Rating Updated Successfully");
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="flex items-end justify-between w-full pt-2 ">
        <div className="flex justify-start flex-1 bg-base-100">
          <div className="dropdown dropdown-hover">
            <button
              tabIndex={1}
              className="flex w-[9em] btn rounded-none btn-secondary"
            >
              <span>Info Type</span> <i className="ri-arrow-down-s-line" />
            </button>

            <ul
              tabIndex={1}
              className="py-4 shadow-xl dropdown-content w-[15em] bg-base-100 z-[10]"
            >
              {tabs.map((el) => (
                <li>
                  <a
                    href={`/app/ratings/${id}/uploaded-files/${el.slug}`}
                    className="flex items-center gap-2 p-3 text-sm border-b border-base-200 hover:bg-gray-200 hover:font-semibold"
                  >
                    <i className={el.icon} />
                    <span>{el.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <input
            onChange={(e) => onSearch(e?.target?.value)}
            type="text"
            placeholder={`Search ${slug?.replace(/-/g, " ")}`}
            className="w-full p-3 text-sm rounded outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-3">
        <div>
          <span className="font-bold capitalize text-primary">
            {slug?.replace("-docs", "")} Upload Status :{" "}
          </span>
          {!rating?.requireQuestionnaireFiles &&
          slug === "questionnaire-docs" ? (
            <span className="font-bold">Disabled</span>
          ) : !rating?.requireAdditionalFiles && slug === "additional-docs" ? (
            <span className="font-bold">Disabled</span>
          ) : (
            <span className="font-bold">Enabled</span>
          )}
          <p className="text-sm opacity-70">
            Click "Action" button to Enable/Disable file uploads
          </p>
        </div>

        <div>
          <div className="dropdown dropdown-hover dropdown-end">
            <button tabIndex={1} className="btn btn-secondary">
              Action <i className="ri-arrow-down-s-line" />
            </button>

            <ul
              tabIndex={1}
              className="py-4 shadow-xl dropdown-content w-[16em] bg-base-100"
            >
              {acceptOptions[slug]?.map((el) => (
                <li key={el?.name}>
                  <button
                    onClick={() => onAcceptAction(el.name)}
                    className="flex items-center justify-end w-full gap-2 px-2 py-3 text-sm border-b border-base-200 hover:bg-gray-200 hover:font-semibold"
                  >
                    <span>{el?.name}</span>
                    <i className="ri-arrow-left-line" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Select All & Download Buttons */}
      <div className="flex justify-between items-center py-3">
        <button className="btn btn-secondary" onClick={toggleSelectAll}>
          {selectedFiles.length === allFiles?.length
            ? "Deselect All"
            : "Select All"}
        </button>
        <button
          className="btn btn-primary"
          onClick={downloadFiles}
          disabled={selectedFiles.length === 0}
        >
          Download Selected ({selectedFiles.length})
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-scroll border-b bg-base-200">
        <table>
          <thead>
            <tr className="text-sm text-left bg-primary text-base-100">
              <th className="w-[2em] p-3 text-center">#</th>

              <th className="w-[2em] p-3 text-center"></th>
              <th className="p-3">FileName</th>
              <th className="p-3">Size</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {allFiles?.map((el, i) => (
              <tr
                className="text-[15px] text-left border-b bg-base-100"
                key={el.id}
              >
                <td className="text-center">{i + 1}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(el.url)}
                    onChange={() => toggleFileSelection(el.url)}
                  />
                </td>
                <td className="p-3">
                  <Link
                    to={el?.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="capitalize link"
                  >
                    {removeExtension(el.name)}
                  </Link>
                </td>
                <td className="p-3">
                  {numeral(el.size / 10000).format("0, 00.00")} KB
                </td>
                <td className="p-3">
                  {dayjs(el.date).format("MMMM DD, YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Thead = ({ title }: { title: String }) => (
  <div className="p-3 text-sm text-white bg-primary">
    <p className="capitalize">{title}</p>
  </div>
);

const Tbody = ({ title }: { title: String }) => (
  <div className="p-3 text-sm bg-base-100">
    <p className="capitalize">{title}</p>
  </div>
);
