import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ListLayout } from "@layouts/list-layout";
import { Suspense, useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
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
      text: "Industry Distribution Chart",
    },
    datalabels: {
      anchor: "center" as any,
      padding: 5,
      height: 10,
      width: 10,
      borderRadius: 10,
      //backgroundColor: "#efefef",
      color: "#efefef",
      font: {
        size: 13,
        weight: "bold",
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);

  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });

  const dashboardData = await RMSservice(token).general.dashboard();
  const clientResponse = await RMSservice(token).clients.all({
    limit: 4,
    page: 1,
    orderBy: { createdAt: "desc" },
  });

  const { docs, ...meta } = clientResponse?.clients || {};

  //total client
  const Client = await RMSservice(token)
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
  const Ratings = await RMSservice(token)
    .ratings.all({
      limit: 4,
      page: 1,
      include: { clientModel: true },
      orderBy: { createdAt: "desc" },
    })
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

  return json({ Client, Ratings, dashboardData });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { Client, Ratings, dashboardData } = useLoaderData<typeof loader>();

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="grid flex-1 w-full gap-4 lg:grid-cols-2">
        <div className="grid gap-4 lg:grid-cols-2 ">
          <BoxChart
            title="Clients"
            subTitle={dashboardData?.clients || 0}
            bgColor="box1"
          />
          <BoxChart
            title="Industries"
            subTitle={dashboardData?.industries || 0}
            bgColor="box2"
          />
          <BoxChart
            title="Pending Ratings"
            subTitle={dashboardData?.pendingRatings || 0}
            bgColor="box3"
          />
          <BoxChart
            title="Completed Ratings"
            subTitle={dashboardData?.completedRatings || 0}
            bgColor="box4"
          />
        </div>

        <LongBoxChart>
          {dashboardData?.industryDistribution && (
            <Bar
              options={options as any}
              data={dashboardData?.industryDistribution}
            />
          )}
        </LongBoxChart>
      </div>

      <div className="grid flex-1 w-full h-full gap-4 overflow-hidden lg:grid-cols-2">
        <HalfBoxChart
          title="Recently Added Ratings"
          actionButton="See ALL"
          action={() => navigate("/app/ratings")}
        >
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

        <HalfBoxChart
          title="Recently Added Client"
          actionButton="See ALL"
          action={() => navigate("/app/clients")}
        >
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
  <div
    className={`flex ${props?.bgColor} flex-col items-center justify-center h-full p-6 rounded text-white`}
  >
    <h3 className="text-5xl font-bold opacity-80">{props?.subTitle}</h3>
    <h3 className="font-normal opacity-80">{props?.title}</h3>
  </div>
);

const LongBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="p-4 col-span-1 shadow  min-h-[10em] bg-base-100 rounded">
    {props?.children}
  </div>
);

const HalfBoxChart = ({ ...props }: BoxChartProps) => (
  <div className="flex flex-col flex-1 h-full gap-4 p-4 p-6 overflow-hidden rounded shadow bg-base-100">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold opacity-80">{props?.title}</h3>
      <button
        onClick={props?.action}
        className="btn-xs btn btn-outline btn-secondary"
      >
        {props?.actionButton}
      </button>
    </div>

    <div className="flex-1 overflow-hidden">{props?.children}</div>
  </div>
);
