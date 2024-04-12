export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-auto">
      <div className="grid w-full grid-cols-2 gap-4">
        <LongBoxChart />

        <div className="grid grid-cols-2 gap-4 ">
          <BoxChart title="Clients" subTitle="8" bgColor="#fabc05" />
          <BoxChart title="Industries" subTitle="3" bgColor="#d3c9bc" />
          <BoxChart title="Pending Ratings" subTitle="21" bgColor="#878c7a" />
          <BoxChart title="Completed Ratings" subTitle="8" bgColor="#fbda84" />
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        <HalfBoxChart title="Recently Added Ratings" actionButton="See ALL"></HalfBoxChart>
        <HalfBoxChart title="Recently Added Client" actionButton="See ALL"></HalfBoxChart>
      </div>
    </div>
  );
}

interface BoxChartProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  actionButton?: string;
  action?: () => void;
  bgColor?: string;
}

const BoxChart = ({ ...props }: BoxChartProps) => (
  <div
    className="flex flex-col items-center justify-center h-full rounded bg-base-100"
    style={{ backgroundColor: props?.bgColor }}
  >
    <h3 className="text-5xl font-bold text-primary opacity-80">{props?.subTitle}</h3>
    <h3 className="font-normal opacity-80 text-primary">{props?.title}</h3>
  </div>
);

const LongBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="p-4 col-span-1 shadow  min-h-[20em] bg-base-100 rounded">{props?.children}</div>
);

const HalfBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="p-4 shadow  min-h-[20em] bg-base-100 rounded flex flex-col overflow-hidden p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold opacity-80">{props?.title}</h3>
      <button className="btn-xs btn btn-outline btn-secondary">{props?.actionButton}</button>
    </div>
    <div className="flex-1">{props?.children}</div>
  </div>
);
