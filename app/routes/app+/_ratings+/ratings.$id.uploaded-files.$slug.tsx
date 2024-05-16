import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, useFetcher, useLoaderData } from '@remix-run/react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { token } = await validateCookie(request);
  const id = params?.id as string;
  const fd = await request.formData();
  const body = Object.fromEntries(fd) as any;

  //convert to boolean
  body.requireQuestionnaireFiles = body.requireQuestionnaireFiles === 'true';
  body.requireAdditionalFiles = body.requireAdditionalFiles === 'true';

  console.log({ body });

  const { updateRating, error } = await RMSservice(token).ratings.update({ id, data: body });
  return json({ updateRating, error });
};

const tabs = [
  { name: 'Questionnaire Documents', slug: 'questionnaire-docs', icon: 'ri-file-3-line' },
  { name: 'Additional Documents', slug: 'additional-docs', icon: 'ri-file-2-line' },
];

const acceptOptions = {
  'questionnaire-docs': [{ name: 'Accept Questionnaire Info' }, { name: 'Request Questionnaire Info' }],
  'additional-docs': [{ name: 'Accept Additional Info' }, { name: 'Request Additional Info' }],
};

export default function UploadedFiles() {
  const { rating, error, slug, id, ratingFiles } = useLoaderData<typeof loader>();
  const [allFiles, setAllFiles] = useState<FileProp[] | null>([]);
  const Fetcher = useFetcher();
  const FetcherData = Fetcher.data as { updateRating: boolean; error: string };

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

  const onAcceptAction = (value: string) => {
    if (value === 'Accept Questionnaire') {
      const confirm = window.confirm('Are you sure you want to accept this questionnaire?');
      if (!confirm) return;
      Fetcher.submit({ requireQuestionnaireFiles: false }, { method: 'patch' });
    }

    if (value === 'Request Questionnaire Info') {
      const confirm = window.confirm('Are you sure you want to request questionnaire info?');
      if (!confirm) return;
      Fetcher.submit({ requireQuestionnaireFiles: true }, { method: 'patch' });
    }

    if (value === 'Accept Additional Info') {
      const confirm = window.confirm('Are you sure you want to accept this additional info?');
      if (!confirm) return;
      Fetcher.submit({ requireAdditionalFiles: false }, { method: 'patch' });
    }

    if (value === 'Request Additional Info') {
      const confirm = window.confirm('Are you sure you want to request additional info?');
      if (!confirm) return;
      Fetcher.submit({ requireAdditionalFiles: true }, { method: 'patch' });
    }
  };

  useEffect(() => {
    setAllFiles(() => [...ratingFiles]);
  }, []);

  useEffect(() => {
    if (FetcherData?.error) toast.error(FetcherData?.error);
    if (FetcherData?.updateRating) toast.success('Rating Updated Successfully');
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="flex items-end justify-between w-full pt-2 ">
        <div className="flex justify-start flex-1 bg-base-100">
          <div className="dropdown dropdown-hover">
            <button tabIndex={1} className="flex w-[9em] btn rounded-none btn-secondary">
              <span>Info Type</span> <i className="ri-arrow-down-s-line" />
            </button>

            <ul tabIndex={1} className="py-4 shadow-xl dropdown-content w-[15em] bg-base-100">
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
            placeholder={`Search ${slug?.replace(/-/g, ' ')}`}
            className="w-full p-3 text-sm rounded outline-none"
          />
        </div>

        <div className="flex justify-end flex-1">
          <div className="dropdown dropdown-hover dropdown-end">
            <button tabIndex={1} className="btn btn-secondary">
              Accept / Request <i className="ri-arrow-down-s-line" />
            </button>

            <ul tabIndex={1} className="py-4 shadow-xl dropdown-content w-[16em] bg-base-100">
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

      <div className="flex items-center justify-between py-3">
        <div>
          <span className="font-bold capitalize text-primary">{slug?.replace('-docs', '')} Documents Status: </span>
          {!rating?.requireQuestionnaireFiles && slug === 'questionnaire-docs' ? (
            <i className="ri-checkbox-circle-fill text-success" />
          ) : !rating?.requireAdditionalFiles && slug === 'additional-docs' ? (
            <i className="ri-checkbox-circle-fill text-success" />
          ) : (
            <i className="ri-close-circle-fill text-error" />
          )}
        </div>

        <div></div>
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
              <tr className="text-[15px] text-left border-b bg-base-100" key={el.id}>
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
