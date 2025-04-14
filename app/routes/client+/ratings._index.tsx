import dayjs from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import RatingsCard from "@ui/cards/ratings-card";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { defer, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateCookie } from "@helpers/cookies";

dayjs.extend(isSameOrAfter);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token, client } = await validateCookie(request);

  if (!client || !token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });

  const search = new URL(request.url).searchParams.get("search") || "";
  const page = Number(new URL(request.url).searchParams.get("page")) || 1;
  const limit = Number(new URL(request.url).searchParams.get("limit")) || 15;

  const videoUrl =
    "https://agustoportals.sfo3.cdn.digitaloceanspaces.com/rating-mgt-portal/video/client-file%20upload.mp4";

  const queryData = RMSservice(token)
    .ratings.all({
      limit,
      page,
      include: { clientModel: true, ratingClassModel: true },
      where: {
        AND: [
          { ratingTitle: { contains: search, mode: "insensitive" } },
          { clientModel: { id: { equals: client?.client } } },
        ],
      },
    })
    .then((res) => {
      const { ratings, error } = res || {};

      const { docs, ...meta } = ratings || {};

      const thead = ["ratingScore", "ratingYear", "issueDate", "expiryDate"];

      const today = dayjs();

      const filteredDocs = docs?.filter((rating) => {
        if (rating.status === "concluded") {
          const expiryDate = dayjs(rating.expiryDate);
          return expiryDate.isSameOrAfter(today);
        }
        return true; // Include ratings with other statuses
      });

      const tbody = filteredDocs?.map((rating) => ({
        ...rating,
        createdAt: dayjs(rating.createdAt).format("MMMM DD, YYYY"),
        updatedAt: dayjs(rating.updatedAt).format("MMMM DD, YYYY"),
      }));

      return { thead, tbody, meta, error, searchTitle: "Search by ratings" };
    });
  return defer({ queryData, videoUrl });
};

export default function Ratings() {
  const { queryData, videoUrl } = useLoaderData<typeof loader>();
  const { setQueryData, storeQueryData } = useRatingStore((state) => state);
  const [meta, setMeta] = useState<any>({});
  const [showVideo, setShowVideo] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newSearch) {
        params.set("search", newSearch);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  const onNext = () => {
    const currentPage = Number(searchParams.get("page")) || 1;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", (currentPage + 1).toString());
      return params;
    });
  };

  const onPrev = () => {
    const currentPage = Number(searchParams.get("page")) || 1;
    if (currentPage > 1) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", (currentPage - 1).toString());
        return params;
      });
    }
  };

  const onChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", newLimit);
      params.set("page", "1"); // Reset to page 1 when limit changes
      return params;
    });
  };

  useEffect(() => {
    queryData.then((res) => {
      setMeta(res?.meta);
    });
  }, [queryData]);

  useEffect(() => {
    toast.promise(
      queryData,
      { pending: "Loading ratings . . . " },
      { toastId: "ratings" }
    );
    queryData.then((res) => setQueryData(res));
  }, [queryData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden ">
   
      <aside className="flex items-center justify-between">
        <p className="text-[2rem] font-bold capitalize">Ratings</p>

        <button
          onClick={() => setShowVideo(true)}
          className="bg-secondary text-base text-white px-4 py-2 rounded-md"
        >
          <i className="ri-live-fill pr-1"></i> Watch Instructional Video
        </button>
      </aside>
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-3xl w-full mx-4 p-4 relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close video"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Instructional Video</h2>
            <video
              controls
              autoPlay
              className="w-full rounded-md shadow"
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              <p>
                Your browser doesn’t support HTML5 video.
                <a href={videoUrl} className="text-blue-600 underline">
                  Download the video
                </a>{" "}
                instead.
              </p>
            </video>
          </div>
        </div>
      )}

      <aside className="flex items-center justify-between overflow-hidden border rounded border-line bg-surface">
        <div className="flex-1">
          <input
            name="search"
            placeholder="Search by rating name"
            className="w-full p-3 outline-none bg-surface "
            onChange={onSearch}
          />
        </div>

        <div className="flex items-center justify-end gap-2"></div>
      </aside>

      <aside className="flex-1 h-full py-4 overflow-auto ">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {storeQueryData?.tbody?.map((el: any) => (
            <RatingsCard key={el?.id} el={el as any} />
          ))}
        </div>
      </aside>

      <aside className="flex items-center justify-between py-3 text-sm border-t shadow border-accent">
        <div className="flex items-center justify-center gap-2">
          <button
            className={`w-10 h-10 py-1 flex justify-center items-center border rounded-lg shadow bg-surface border-secondary text-secondary ${
              meta?.hasPrevPage
                ? "cursor-pointer opacity-1"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={onPrev}
            disabled={!meta?.hasPrevPage}
          >
            <i className="text-xl ri-arrow-left-s-line"></i>
          </button>

          <button
            className={`w-10 h-10 py-1 flex justify-center items-center rounded-lg shadow bg-secondary border-secondary text-base-100 ${
              meta?.hasNextPage
                ? "cursor-pointer opacity-1"
                : "cursor-not-allowed opacity-55"
            }`}
            onClick={onNext}
            disabled={!meta?.hasNextPage}
          >
            <i className="text-xl ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="flex items-center justify-end gap-4">
          {meta?.page * meta?.limit + 1 - meta?.limit} -{" "}
          {meta?.totalDocs < meta?.page * meta?.limit
            ? meta?.totalDocs
            : meta?.page * meta?.limit}{" "}
          of {meta?.totalDocs || 0}
          <select
            onChange={onChangePerPage}
            defaultValue={meta?.limit}
            className="w-auto p-2 border rounded shadow outline-none cursor-pointer bg-surface border-line"
          >
            <option value="15">Per Page: 15</option>
            <option value="30">Per Page: 30</option>
            <option value="50">Per Page: 50</option>
          </select>
        </div>
      </aside>
    </div>
  );
}
