export default function RatingsSummaryCard({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <div className="py-2">
      <p className="text-xs font-bold capitalize opacity-60">{title}</p>
      <h2 className="text-2xl font-bold">{subTitle}</h2>
    </div>
  );
}
