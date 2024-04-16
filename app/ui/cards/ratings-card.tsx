import dayjs from 'dayjs';
import { NavLink } from '@remix-run/react';
import { RatingWithRelations } from '@helpers/zodPrisma';

export default function RatingsCard({ el }: { el: RatingWithRelations }) {
  return (
    <div className="flex flex-col items-start gap-4 p-4 text-sm border rounded p- border-accent bg-base-100">
      <div className="flex items-center justify-between w-full">
        <span className="text-3xl font-bold">{el?.ratingClassModel?.name || '--'}</span>
        <span className={`${el?.status} capitalize  text-xs`}>{el?.status}</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex-1 font-semibold">{el?.clientModel?.companyName}</p>
        <p className="flex-1 opacity-60">{el?.ratingTitle}</p>
        <p className="text-xs opacity-60">
          {!el?.issueDate ? 'Issue Date' : dayjs(el?.issueDate).format('MMM DD, YYYY')}
          {' - '}
          {!el?.expiryDate ? 'Expiry Date' : dayjs(el?.expiryDate).format('MMM DD, YYYY')}
        </p>
      </div>

      <div className="flex items-center justify-between w-full pt-3 text-xs border-t">
        <p>Rating Year: {el?.ratingYear}</p>

        <NavLink to={`${el?.id}`} className="text-xs font-bold uppercase text-secondary hover:underline">
          View Details
        </NavLink>
      </div>
    </div>
  );
}
