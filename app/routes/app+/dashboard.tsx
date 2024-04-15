import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { LoaderFunctionArgs } from '@remix-run/node';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.size = 13;
ChartJS.defaults.font.family = 'Rethink Sans';
const options = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Industry Distribution',
    },
  },
};
const labels = ['Banks', 'Funds', 'Insurance', 'Microfinance', 'Mortgage Banks', 'Municipals', 'Corporates'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 78],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);

  //total industry
  //total client
  //total completed ratings
  //total pending ratings
  return {};
};

export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-auto">
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <div className="grid gap-4 lg:grid-cols-2 ">
          <BoxChart title="Clients" subTitle="8" bgColor="#fabc05" />
          <BoxChart title="Industries" subTitle="3" bgColor="#d3c9bc" />
          <BoxChart title="Pending Ratings" subTitle="21" bgColor="#878c7a" />
          <BoxChart title="Completed Ratings" subTitle="8" bgColor="#fbda84" />
        </div>

        <LongBoxChart>
          <Bar options={options} data={data} />
        </LongBoxChart>
      </div>

      <div className="grid flex-1 w-full gap-4 lg:grid-cols-2">
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
    className="flex flex-col items-center justify-center h-full p-6 rounded bg-base-100"
    style={{ backgroundColor: props?.bgColor }}
  >
    <h3 className="text-5xl font-bold text-primary opacity-80">{props?.subTitle}</h3>
    <h3 className="font-normal opacity-80 text-primary">{props?.title}</h3>
  </div>
);

const LongBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="p-4 col-span-1 shadow  min-h-[10em] bg-base-100 rounded">{props?.children}</div>
);

const HalfBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="flex flex-col flex-1 p-4 p-6 overflow-hidden rounded shadow bg-base-100">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold opacity-80">{props?.title}</h3>
      <button className="btn-xs btn btn-outline btn-secondary">{props?.actionButton}</button>
    </div>
    <div className="flex-1">{props?.children}</div>
  </div>
);
