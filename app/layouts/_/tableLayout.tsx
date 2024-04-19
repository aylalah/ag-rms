import { Icons } from '@components';
import { Link, useNavigate } from '@remix-run/react';
import { useState } from 'react';

const splitCamelCase = (str: string) => {
  if (!str) return str;
  return str
    .split(/(?=[A-Z])/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export interface TableProps {
  tableSize?: 'table-auto' | 'table-fixed';
  onPrint?: () => void;
  createLink?: string;
  editLink?: string;
  canSearch?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  sortParams?: { name: string; query: string }[];
  searchTitle?: string;
  title: string;
  thead?: string[];
  tbody?: any[];
  meta: {
    sort?: string;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalDocs: number;
    totalPages: number;
  };
}

export const TableLayout = ({
  tableSize = 'table-auto',
  showHeader = true,
  showFooter = true,
  title,
  tbody = [],
  thead,
  sortParams,
  searchTitle = 'Search',
  canSearch = true,
  createLink,
  editLink,
  onPrint,
  meta,
}: TableProps) => {
  const navigation = useNavigate();
  const [activeSort, setActiveSort] = useState<string>(meta?.sort || '');
  const [search, setSearch] = useState<string>('');

  const onSort = (args: { key: string; order: string }) => {
    const { key, order } = args;
    const query = sortParams?.find((e) => e.name === key)?.query || key;
    const action = search?.length > 0 ? `?search=${search}&sort=${query}+${order}` : `?sort=${query}+${order}`;
    navigation(action);
    setActiveSort(`${key}+${order}`);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setActiveSort('');
    if (!e.target.value) return navigation(`?`);
    navigation(`?search=${encodeURIComponent(e.target.value)}`);
  };

  const onNext = () => {
    if (meta?.page) {
      const page = meta?.page + 1;
      navigation(`?page=${page}&limit=${meta?.limit}`);
    }
  };

  const onPrev = () => {
    if (meta?.page) {
      const page = meta?.page - 1;
      navigation(`?page=${page}&limit=${meta?.limit}`);
    }
  };

  const onChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    navigation(`?page=1&limit=${limit}`);
  };

  return (
    <div className="h-[100%] w-full flex gap-3  flex-col overflow-y-hidden relative">
      {showHeader && (
        <aside className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-[1.5rem] font-bold capitalize">{title}</p>
            {createLink && (
              <Link
                to={createLink}
                className="w-16 p-1 text-[11px] font-bold text-center text-white rounded-lg shadow bg-secondary"
              >
                CREATE
              </Link>
            )}
          </div>

          <div className="flex items-center justify-end flex-1 gap-2">
            {onPrint && (
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-secondary"
                onClick={onPrint}
              >
                <i className="text-sm text-white ri-printer-line"></i>
              </button>
            )}
          </div>
        </aside>
      )}

      <aside className="flex items-center justify-between overflow-hidden border rounded border-line bg-surface">
        {canSearch && (
          <div className="flex-1">
            <input
              name="search"
              placeholder={searchTitle}
              className="w-full p-3 text-sm outline-none bg-surface"
              onChange={onSearch}
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-2"></div>
      </aside>

      <aside className="flex-1 h-full overflow-auto whitespace-nowrap">
        {tbody?.length > 0 && (
          <table className={`${tableSize} w-full  bg-surface text-[0.85rem]`}>
            <thead>
              <tr className="sticky border-t-[2px] border-b-[2px] rounded bg-primary text-base-100 border-line">
                <th className="w-[4em]">#</th>
                {thead?.map((el, i) => (
                  <th key={i} className="sticky flex-1 p-3 font-bold text-left capitalize border-line">
                    <div className="flex items-center justify-between">
                      {splitCamelCase(el)}

                      <div>
                        {sortParams?.find((e) => e.name === el) && onSort && (
                          <i
                            aria-hidden="true"
                            className={`${
                              activeSort === `${el}+asc` ? 'opacity-100' : 'opacity-50'
                            } text-xl text-secondary cursor-pointer ${activeSort} ${el}asc  ri-arrow-up-s-fill`}
                            onClick={() => onSort({ key: el, order: 'asc' })}
                          ></i>
                        )}

                        {sortParams?.find((e) => e.name === el) && onSort && (
                          <i
                            aria-hidden="true"
                            className={`${
                              activeSort === `${el}+desc` ? 'opacity-100' : 'opacity-50'
                            } text-xl text-secondary cursor-pointer ${activeSort} ${el}asc  ri-arrow-down-s-fill`}
                            onClick={() => onSort({ key: el, order: 'desc' })}
                          ></i>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {tbody?.map((el, i) => (
                <tr key={el?.id} className="duration-200 border-b even:bg-[#fff1] border-line ">
                  <td className="text-center">{meta?.page * meta?.limit + i + 1 - meta?.limit}</td>
                  {thead?.map((key, i) => (
                    <td key={i} className="p-3 overflow-hidden text-left min-w-[20%] ">
                      {i === 0 ? (
                        editLink ? (
                          <Link
                            to={`${editLink}${el['id']}`}
                            className={`${el[key]} underline transform cursor-pointer hover:scale-[99.7%] transition-all ease-in-out`}
                          >
                            {el[key] || '-'}
                          </Link>
                        ) : (
                          <span className="">{el[key]}</span>
                        )
                      ) : (
                        <span className={`${el[key]} capitalize`}>{el[key] || '-'}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tbody?.length < 1 && (
          <div className="flex flex-col items-center justify-center flex-1 h-full">
            <h3 className="font-bold opacity-40">No Data Found</h3>
            <h3 className="text-sm tracking-wide opacity-40 ">List of {title?.toLowerCase()} will be shown here</h3>
          </div>
        )}
      </aside>

      {showFooter && (
        <aside className="flex items-center justify-between py-3 text-sm shadow">
          <div className="flex items-center justify-center gap-2">
            <button
              className={`w-10 h-10 py-1 flex justify-center items-center border rounded-lg shadow bg-surface border-secondary text-secondary ${
                meta?.hasPrevPage ? 'cursor-pointer opacity-1' : 'cursor-not-allowed opacity-50'
              }`}
              onClick={onPrev}
              disabled={!meta?.hasPrevPage}
            >
              {Icons.ChevronLeft(22)}
            </button>

            <button
              className={`w-10 h-10 py-1 flex justify-center items-center rounded-lg shadow bg-secondary border-secondary text-base-100 ${
                meta?.hasNextPage ? 'cursor-pointer opacity-1' : 'cursor-not-allowed opacity-55'
              }`}
              onClick={onNext}
              disabled={!meta?.hasNextPage}
            >
              {Icons.ChevronRight(22)}
            </button>
          </div>

          <div className="flex items-center justify-end gap-4 text-sm">
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
      )}
    </div>
  );
};
