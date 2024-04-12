import dayjs from 'dayjs';
import RatingsCard from '@ui/cards/ratings-card';
import { Await, NavLink, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = Number(new URL(request.url).searchParams.get('page')) || 1;
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 15;

  const queryData = RMSservice(token)
    .ratings.all({
      limit,
      page,
      include: { clientModel: true, ratingClassModel: true },
      where: { clientModel: { companyName: { contains: search } } },
    })
    .then((res) => {
      const { ratings, error } = res || {};
      const { docs, ...meta } = ratings || {};
      const thead = ['ratingClass', 'ratingYear', 'issueDate', 'expiryDate'];
      const tbody = docs?.map((rating) => ({
        ...rating,
        createdAt: dayjs(rating.createdAt).format('MMMM DD, YYYY'),
        updatedAt: dayjs(rating.updatedAt).format('MMMM DD, YYYY'),
      }));

      return { thead, tbody, meta, error, searchTitle: 'Search by ratings' };
    });
  return defer({ queryData });
};

export default function Ratings() {
  const { queryData } = useLoaderData<typeof loader>();
  const { setQueryData, storeQueryData } = useRatingStore((state) => state);
  const [meta, setMeta] = useState<any>({});

  const onSearch = () => {};

  const onNext = () => {};

  const onPrev = () => {};

  const onChangePerPage = () => {};

  useEffect(() => {
    queryData.then((res) => {
      setMeta(res?.meta);
    });
  }, [queryData]);

  useEffect(() => {
    toast.promise(queryData, { pending: 'Loading ratings . . . ' }, { toastId: 'ratings' });
    queryData.then((res) => setQueryData(res));
  }, []);

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
            placeholder="Search by"
            className="w-full p-3 outline-none bg-surface "
            onChange={onSearch}
          />
        </div>

        <div className="flex items-center justify-end gap-2"></div>
      </aside>

      <aside className="flex-1 h-full py-4 overflow-auto ">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {storeQueryData?.tbody?.map((el) => <RatingsCard key={el.id} el={el as any} />)}
        </div>
      </aside>

      <aside className="flex items-center justify-between py-3 text-sm border-t shadow border-accent">
        <div className="flex items-center justify-center gap-2">
          <button
            className={`w-10 h-10 py-1 flex justify-center items-center border rounded-lg shadow bg-surface border-secondary text-secondary ${
              meta?.hasPrevPage ? 'cursor-pointer opacity-1' : 'cursor-not-allowed opacity-50'
            }`}
            onClick={onPrev}
            disabled={!meta?.hasPrevPage}
          >
            <i className="text-xl ri-arrow-left-s-line"></i>
          </button>

          <button
            className={`w-10 h-10 py-1 flex justify-center items-center rounded-lg shadow bg-secondary border-secondary text-base-100 ${
              meta?.hasNextPage ? 'cursor-pointer opacity-1' : 'cursor-not-allowed opacity-55'
            }`}
            onClick={onNext}
            disabled={!meta?.hasNextPage}
          >
            <i className="text-xl ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="flex items-center justify-end gap-4">
          {meta?.page * meta?.limit + 1 - meta?.limit} -{' '}
          {meta?.totalDocs < meta?.page * meta?.limit ? meta?.totalDocs : meta?.page * meta?.limit} of{' '}
          {meta?.totalDocs || 0}
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
