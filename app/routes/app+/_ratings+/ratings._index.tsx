import RatingsCard from "@ui/cards/ratings-card";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const loader = async (ctx: LoaderFunctionArgs) => {
  return RatingLoader(ctx);
};

export default function Ratings() {
  const { queryData } = useLoaderData<typeof loader>();
  const { setQueryData, setRatings, storeQueryData } = useRatingStore(
    (state) => state
  );
  const [meta, setMeta] = useState<any>({});
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
      setRatings(
        res?.tbody?.map((el) => ({
          id: el?.id,
          ratingTitle: el?.ratingTitle,
          clientName: el.clientModel?.companyName,
        }))
      );
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
        <div className="flex items-center gap-4">
          <p className="text-[2rem] font-bold capitalize">All Ratings</p>
        </div>

        <div className="flex items-center justify-end flex-1 gap-2"></div>
      </aside>

      <aside className="flex items-center justify-between overflow-hidden border rounded border-line bg-surface">
        <div className="flex-1">
          <input
            name="search"
            placeholder="Search by company name"
            className="w-full p-3 outline-none bg-surface "
            onChange={onSearch}
          />
        </div>

        <div className="flex items-center justify-end gap-2"></div>
      </aside>

      <aside className="flex-1 h-full py-4 overflow-auto ">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {storeQueryData?.tbody?.map((el: any) => (
            <RatingsCard key={el.id} el={el as any} />
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
