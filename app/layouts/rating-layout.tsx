import { FetcherWithComponents, Link } from '@remix-run/react';
import dayjs from 'dayjs';

type RatingProps = {
  rating: any;
  Fetcher?: FetcherWithComponents<any>;
  reports?: { name: string; version: string; link: string }[];
  isReadOnly?: boolean;
};

export default function RatingLayout({ rating, reports, isReadOnly, Fetcher }: RatingProps) {
  return (
    <div className="flex flex-col flex-1 h-full gap-6">
      <div className="flex items-end justify-between pt-6">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">
            {rating?.ratingYear} - {rating?.ratingTitle}
          </h1>
          <span className={`px-4 py-1 text-xs text-white capitalize rounded-full ${rating?.status}`}>
            {rating?.status}
          </span>
        </div>

        <Link to="questionnaire" className="text-sm btn btn-secondary btn-sm">
          {rating?.status === 'pending' && !isReadOnly ? 'Fill ' : 'View '} Questionnaire
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="p-4 text-xs font-bold text-white uppercase bg-primary">Summary</h2>

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
              <h2 className="p-4 text-xs font-bold text-white uppercase bg-primary">Contact Information</h2>
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

        <div className="w-[25em] flex flex-col h-full">
          <div className="p-4 rounded bg-primary">
            <h2 className="text-xs font-bold text-white uppercase ">Reports</h2>
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
            <h2 className="text-xs font-bold text-white uppercase ">Resources</h2>
          </div>

          <div className="p-4 border rounded bg-base-100 border-accent">
            <ul>
              <li>
                <a
                  href={`${rating?.methodologyModel?.id}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm link-secondary"
                >
                  Methodology
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
      className={`grid items-center grid-cols-3 text-xs ${isHeader && 'font-bold uppercase bg-accent'} border-b border-accent ${isEvenStyle && 'bg-gray-100'}`}
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
    <p className="text-xs font-bold capitalize opacity-60 ">{title}</p>
    {subSubTitle && <h2 className="text-[14px] font-semibold opacity-90">{subSubTitle}</h2>}
    <h2 className={` font-bold opacity-90 ${isLarge ? 'text-[20px]' : 'text-[14px]'}`}>{subTitle}</h2>
  </div>
);
