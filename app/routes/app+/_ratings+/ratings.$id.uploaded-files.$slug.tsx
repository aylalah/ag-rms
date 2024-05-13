import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, useLoaderData } from '@remix-run/react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const id = params.id || 'testing';
  const slug = params.slug as 'questionnaire-docs' | 'additional-docs';
  const { rating, error } = await RMSservice(token).ratings.one({ id });
  let ratingFiles = [];

  if (rating?.questionnaireFiles && slug === 'questionnaire-docs') {
    ratingFiles = JSON.parse(rating?.questionnaireFiles) || [];
  }

  if (rating?.additionalFiles && slug === 'additional-docs') {
    ratingFiles = JSON.parse(rating?.additionalFiles) || [];
  }

  return json({ error, slug, rating, id, ratingFiles });
};

const tabs = [
  { name: 'Questionnaire Documents', slug: 'questionnaire-docs' },
  { name: 'Additional Documents', slug: 'additional-docs' },
];

export default function UploadedFiles() {
  const { rating, error, slug, id, ratingFiles } = useLoaderData<typeof loader>();
  const [allFiles, setAllFiles] = useState<FileProp[] | null>([]);

  const removeExtension = (value: string) => {
    if (!value) return '';
    return value.split('.').slice(0, -1).join('.');
  };

  const onSearch = (value: string) => {
    if (!value) return setAllFiles(ratingFiles as any);
    const rawFiles = (ratingFiles as any as FileProp[]) || [];
    const filtered = rawFiles.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()));
    setAllFiles(filtered as any);
  };

  useEffect(() => {
    setAllFiles(() => [...ratingFiles]);
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="flex items-end justify-between w-full pt-2 ">
        <div className="flex justify-start flex-1 overflow-hidden">
          <input
            onChange={(e) => onSearch(e?.target?.value)}
            type="text"
            placeholder={`Search ${slug?.replace(/-/g, ' ')}`}
            className="w-full p-3 text-sm rounded outline-none bg-base-100"
          />
        </div>

        <div className="flex justify-end flex-1">
          <div role="tablist" className="flex tabs tabs-lifted">
            {tabs.map((el) => (
              <a
                key={el?.slug}
                href={`/app/ratings/${id}/uploaded-files/${el?.slug}`}
                role="tab"
                className={`p-3 text-sm border border-secondary ${
                  slug === el.slug ? 'text-base-100 bg-secondary' : ' border-secondary opacity-30'
                } `}
              >
                {el?.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-scroll border-b bg-base-200">
        <table>
          <thead>
            <tr className="text-sm text-left bg-primary text-base-100">
              <th className="w-[2em] p-3 text-center">#</th>
              <th className="p-3">FileName</th>
              <th className="p-3">Size</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {allFiles?.map((el, i) => (
              <tr className="text-sm text-left border-b bg-base-100" key={el.id}>
                <td className="text-center">{i + 1}</td>
                <td className="p-3">
                  <Link to={el?.url} target="_blank" referrerPolicy="no-referrer" className="capitalize link">
                    {removeExtension(el.name)}
                  </Link>
                </td>
                <td className="p-3">{numeral(el.size / 10000).format('0, 00.00')} KB</td>
                <td className="p-3">{dayjs(el.date).format('MMMM DD, YYYY')}</td>
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
