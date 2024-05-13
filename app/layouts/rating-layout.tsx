import { FetcherWithComponents, Link } from '@remix-run/react';
import dayjs from 'dayjs';

type RatingProps = {
  rating: any;
  Fetcher?: FetcherWithComponents<any>;
  reports?: { name: string; version: string; link: string }[];
  isReadOnly?: boolean;
  linkTo: string;
  isClientOnly: boolean;
};

export default function RatingLayout({
  rating,
  reports,
  isReadOnly,
  linkTo,
  Fetcher,
  isClientOnly = false,
}: RatingProps) {
  return (
    <div className="flex flex-col flex-1 h-full gap-6 overflow-auto">
      <div className="flex items-end justify-between pt-6">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">
            {rating?.ratingYear} - {rating?.ratingTitle}
          </h1>
          <span className={`px-4 py-1 text text-white capitalize rounded-full ${rating?.status}`}>
            {rating?.status}
          </span>
        </div>

        {isClientOnly ? (
          <div className="dropdown dropdown-hover dropdown-end">
            <Link tabIndex={0} to="#" className="text-base btn btn-secondary">
              Upload Files
              <i className="ri-arrow-down-s-line" />
            </Link>

            <ul
              tabIndex={0}
              className="rounded-lg p-4 text-sm shadow-lg dropdown-content bg-base-100 w-[18em] z-[10] mr-1"
            >
              <li className="hover:bg-secondary hover:text-base-100">
                <Link to={`${linkTo}/questionnaire-docs`} className="flex items-center gap-2 py-4 hover:px-2">
                  <i className="ri-file-text-line" />
                  Questionnaire Documents
                </Link>
              </li>

              <li className="hover:bg-secondary hover:text-base-100">
                <Link to={`${linkTo}/additional-docs`} className="flex items-center gap-2 py-4 hover:px-2">
                  <i className="ri-file-paper-line" />
                  Additional Documents
                </Link>
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
              <h2 className="p-4 text-sm font-bold text-white uppercase bg-primary">Summary</h2>

              <div className="grid grid-cols-2 gap-4">
                <SummaryCard title="Rating Class" isLarge subTitle={rating?.ratingClassModel?.name || '-'} />
                <SummaryCard title="Rating Year" isLarge subTitle={rating?.ratingYear || '-'} />
                <SummaryCard
                  title="Issue Date"
                  subTitle={!rating?.issueDate ? '-' : dayjs(rating?.issueDate).format('MMMM DD, YYYY')}
                />
                <SummaryCard
                  title="Expiry Date"
                  subTitle={!rating?.expiryDate ? '-' : dayjs(rating?.expiryDate).format('MMMM DD, YYYY')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="p-4 text-sm font-bold text-white uppercase bg-primary">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <SummaryCard
                  title="Primary Analyst"
                  subTitle={rating?.primaryAnalyst || '-'}
                  subSubTitle="info@agusto.com | 01-2707222-3"
                />

                <SummaryCard
                  title="Secondary Analyst"
                  subTitle={rating?.secondaryAnalyst || '-'}
                  subSubTitle="info@agusto.com | 01-2707222-3"
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
          <div className="p-4 rounded bg-primary">
            <h2 className="text-sm font-bold text-white uppercase ">Reports</h2>
          </div>
          <div className="p-4 border rounded bg-base-100 border-accent min-h-[20vh]">
            <ul>
              <Tr name="Report Name" version="Version" isHeader />
              {reports?.map((report, i) => (
                <Tr key={i} index={i + 1} name={report?.name} version={report?.version} link={report?.link} />
              ))}
            </ul>
          </div>

          <div className="p-4 mt-4 border rounded bg-primary border-accent">
            <h2 className="text-sm font-bold text-white uppercase ">Download Resources</h2>
          </div>

          <div className="border rounded border-accent">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Tr = ({
  name,
  version,
  link,
  isHeader,
  index,
}: {
  name: string;
  version: string;
  link?: string;
  isHeader?: boolean;
  index?: number;
}) => {
  const isEvenStyle = index && index % 2 === 0;
  return (
    <li
      className={`grid items-center grid-cols-3 text-sm ${
        isHeader && 'font-bold uppercase bg-accent'
      } border-b border-accent ${isEvenStyle && 'bg-gray-100'}`}
    >
      <div className="h-full col-span-2 px-2 py-3 border-r">{name}</div>
      <Link
        to={`${link}`}
        target="_blank"
        referrerPolicy="no-referrer"
        className={`py-3 text-center p-x2  ${!isHeader && 'link text-secondary'}`}
      >
        {version}
      </Link>
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
  subTitle: string;
  subSubTitle?: string;
  isLarge?: boolean;
}) => (
  <div className="flex flex-col gap-1 px-4 py-3 shadow bg-base-100">
    <p className="text-sm font-bold capitalize opacity-60 ">{title}</p>
    {subSubTitle && <h2 className="font-medium opacity-90">{subSubTitle}</h2>}
    <h2 className={` font-bold opacity-90 ${isLarge ? 'text-[20px]' : 'text-[14px]'}`}>{subTitle}</h2>
  </div>
);
