import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { ListLayout } from "@layouts/list-layout";
import { Suspense, useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels, Title, Tooltip, Legend);
ChartJS.defaults.font.size = 12;
ChartJS.defaults.font.family = "Rethink Sans";
const options = {
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  responsive: true,

  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Distribution by Industry",
    },
    datalabels: {
      anchor: "end" as any,
      padding: 5,
      borderRadius: 5,
      backgroundColor: "#002d53",
      color: "#efefef",
      font: {
        size: 12,
      },
    },
  },
  scales: {
    y: {
      grid: { display: false },
      display: true,
    },
    x: {
      padding: 40,
      display: false,
      grid: { display: false },
    },
  },
};
const labels = ["Banks", "Funds", "Insurance", "Microfinance", "Mortgage Banks", "Municipals", "Corporate"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [6, 5, 9.1, 9, 5, 5, 7],
      backgroundColor: "#CE5A61",
    },
  ],
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);

  //total industry
  const Industry = RMSservice(token)
    .industries.all({ limit: 1, page: 1 })
    .then((res) => ({ count: res?.industries?.totalDocs }));

  //total client
  const Client = RMSservice(token)
    .clients.all({ limit: 4, page: 1, orderBy: { createdAt: "desc" } })
    .then((res) => {
      const { docs, ...meta } = res?.clients || {};
      return {
        count: res?.clients?.totalDocs,
        meta,
        data: docs?.map((doc) => ({ ...doc, href: `/app/clients/${doc.id}` })),
      };
    });

  //total client
  const Ratings = RMSservice(token)
    .ratings.all({ limit: 4, page: 1, include: { clientModel: true }, orderBy: { createdAt: "desc" } })
    .then((res) => {
      const { docs, ...meta } = res?.ratings || {};
      return {
        count: res?.ratings?.totalDocs,
        meta,
        data: docs?.map((doc) => ({
          ...doc,
          companyName: doc?.clientModel?.companyName,
          href: `/app/ratings/${doc.id}`,
        })),
      };
    });

  //total completed ratings
  const CompletedRatings = RMSservice(token)
    .ratings.all({ limit: 1, page: 1, where: { status: "concluded" } })
    .then((res) => ({ count: res?.ratings?.totalDocs }));

  //total pending ratings
  const PendingRatings = RMSservice(token)
    .ratings.all({ limit: 1, page: 1, include: { clientModel: true }, where: { status: { not: "concluded" } } })
    .then((res) => {
      const { docs, ...meta } = res?.ratings || {};
      return {
        count: res?.ratings?.totalDocs,
        meta,
        data: docs?.map((doc) => ({ ...doc, companyName: doc?.clientModel?.companyName })),
      };
    });

  return defer({ Industry, Client, Ratings, CompletedRatings, PendingRatings });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { Industry, Client, Ratings, CompletedRatings, PendingRatings } = useLoaderData<typeof loader>();
  const [dashboardCounts, setDashboardCounts] = useState<{
    clients?: number;
    industries?: number;
    completedRatings?: number;
    pendingRatings?: number;
  } | null>(null);

  useEffect(() => {
    Industry.then((res) => setDashboardCounts((prev) => ({ ...prev, industries: res.count })));
    Client.then((res) => setDashboardCounts((prev) => ({ ...prev, clients: res.count })));
    CompletedRatings.then((res) => setDashboardCounts((prev) => ({ ...prev, completedRatings: res.count })));
    PendingRatings.then((res) => setDashboardCounts((prev) => ({ ...prev, pendingRatings: res.count })));
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="grid flex-1 w-full gap-4 lg:grid-cols-2">
        <div className="grid gap-4 lg:grid-cols-2 ">
          <BoxChart title="Clients" subTitle={dashboardCounts?.clients || 0} bgColor="box1" />
          <BoxChart title="Industries" subTitle={dashboardCounts?.industries || 0} bgColor="box2" />
          <BoxChart title="Pending Ratings" subTitle={dashboardCounts?.pendingRatings || 0} bgColor="box3" />
          <BoxChart title="Completed Ratings" subTitle={dashboardCounts?.completedRatings || 0} bgColor="box4" />
        </div>

        <LongBoxChart>
          <Bar options={options} data={data} />
        </LongBoxChart>
      </div>

      <div className="grid flex-1 w-full h-full gap-4 overflow-hidden lg:grid-cols-2">
        <HalfBoxChart title="Recently Added Ratings" actionButton="See ALL" action={() => navigate("/app/ratings")}>
          <Suspense fallback={<></>}>
            <Await resolve={Ratings}>
              {(res) => (
                <ListLayout
                  title="Recently Added Ratings"
                  canSearch={false}
                  showFooter={false}
                  showHeader={false}
                  meta={res?.meta as any}
                  tbody={res.data}
                  thead={["ratingTitle", "companyName"]}
                />
              )}
            </Await>
          </Suspense>
        </HalfBoxChart>

        <HalfBoxChart title="Recently Added Client" actionButton="See ALL" action={() => navigate("/app/clients")}>
          <Suspense fallback={<></>}>
            <Await resolve={Client}>
              {(res) => (
                <ListLayout
                  title="Recently Added Ratings"
                  canSearch={false}
                  showFooter={false}
                  showHeader={false}
                  meta={res?.meta as any}
                  tbody={res.data}
                  thead={["companyName", "country"]}
                />
              )}
            </Await>
          </Suspense>
        </HalfBoxChart>
      </div>
    </div>
  );
}

interface BoxChartProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string | number;
  actionButton?: string;
  action?: () => void;
  bgColor?: string;
}

const BoxChart = ({ ...props }: BoxChartProps) => (
  <div className={`flex ${props?.bgColor} flex-col items-center justify-center h-full p-6 rounded text-white`}>
    <h3 className="text-5xl font-bold opacity-80">{props?.subTitle}</h3>
    <h3 className="font-normal opacity-80">{props?.title}</h3>
  </div>
);

const LongBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="p-4 col-span-1 shadow  min-h-[10em] bg-base-100 rounded">{props?.children}</div>
);

const HalfBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="flex flex-col flex-1 h-full gap-4 p-4 p-6 overflow-hidden rounded shadow bg-base-100">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold opacity-80">{props?.title}</h3>
      <button onClick={props?.action} className="btn-xs btn btn-outline btn-secondary">
        {props?.actionButton}
      </button>
    </div>

    <div className="flex-1 overflow-hidden">{props?.children}</div>
  </div>
);
