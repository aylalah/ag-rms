export default function RatingsSummaryCard({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <div className="py-4">
      <p className="text-xs font-bold uppercase opacity-60">{title}</p>
      <h2 className="text-2xl font-bold">{subTitle}</h2>
    </div>
  );
}
