import dayjs from "dayjs";
import MenuLayout from "@layouts/menu-layout";
import useAppStore from "@stores";
import { appCookie, validateCookie } from "@helpers/cookies";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

const sortOrder = ["menu", "admin"];

const MenuLinks = [
  /*  {
    name: 'dashboard',
    to: '/client/dashboard',
    icon: 'Dashboard',
    group: 'menu',
  }, */
  {
    name: "ratings",
    to: "/client/ratings",
    icon: "Ratings",
    group: "menu",
  },
];

const SettingsLinks = [
  {
    name: "logout",
    to: "/auth/logout",
    icon: "ri-logout-box-line",
    group: "admin",
  },
];

export const groupedClientRoutes = MenuLinks.map((route) => {
  const { group } = route;
  const index = sortOrder.indexOf(group);
  return { ...route, index };
})
  .sort((a, b) => a.index - b.index)
  .reduce((acc: { [key: string]: IRoute[] }, cur) => {
    const { group } = cur;
    if (!acc[group]) acc[group] = [];
    acc[group].push(cur);
    return acc;
  }, {});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { client, user, token } = await validateCookie(request);
  if (!client)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });

  const result = await RMSservice(token).clients.one({ id: client.client });

  return json({ client: result.client });
};

export default function App() {
  const { pathname } = useLocation();
  const { client } = useLoaderData<typeof loader>();
  const { setClient } = useAppStore.user((state) => state);
  const [breadcrumb, setBreadcrumb] = useState<
    { name: string; path: string }[]
  >([]);
  const { ratingsData } = useRatingStore((state) => state);

  useEffect(() => setClient(client as any), [client]);
  useEffect(() => {
    const crumbs = pathname.split("/").filter(Boolean);
    const crumbsSlice = crumbs.slice(2, crumbs.length);

    const breadcrumb = crumbs
      .map((el) => {
        const idToName = ratingsData.filter((ell) => ell.id === el)[0];
        return {
          name: idToName?.clientName || el,
          path: `/client/ratings/${el}`,
        };
      })
      .filter((el) => el.name?.toLowerCase() !== "client")
      .filter((el) => el.name?.toLowerCase() !== "ratings")
      .filter((el) => el.name?.toLowerCase() !== "files-uploads");

    setBreadcrumb(breadcrumb);
  }, [pathname]);

  return (
    <MenuLayout links={MenuLinks} settings={SettingsLinks}>
      <div className="my-2 mt-3 text-sm capitalize breadcrumbs">
        <ul>
          <li>
            <Link to="/client/ratings">Home</Link>
          </li>
          {breadcrumb.map((el, i) => (
            <li key={i}>
              {i === breadcrumb.length - 1 ? (
                el?.name
              ) : (
                <Link to={`${el.path}`}>{el.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <footer className="flex items-center justify-between py-4 text-xs font-bold ">
        <div className="opacity-40">
          {" "}
          &copy; Copyright Agusto & Co.{dayjs().format("YYYY")}.{" "}
        </div>

        <div className="flex items-center justify-start gap-4 text-xs opacity-40">
          {/*  <a href="#">Term of service</a> */}
          <a href="https://www.agusto.com/privacy-policy/">Privacy Policy</a>
        </div>
      </footer>
    </MenuLayout>
  );
}
