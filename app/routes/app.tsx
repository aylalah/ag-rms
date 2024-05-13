import dayjs from 'dayjs';
import MenuLayout from '@layouts/menu-layout';
import useAppStore from '@stores';
import { appCookie, validateCookie } from '@helpers/cookies';
import { Icons } from '@components';
import { json, LinksFunction, LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

const sortOrder = ['menu', 'admin'];

const MenuLinks = [
  {
    name: 'dashboard',
    to: '/app/dashboard',
    icon: 'Dashboard',
    group: 'menu',
  },
  {
    name: 'clients',
    to: '/app/clients',
    icon: 'Clients',
    group: 'menu',
  },
  {
    name: 'ratings',
    to: '/app/ratings',
    icon: 'Ratings',
    group: 'menu',
  },
];

const SettingsLinks = [
  {
    name: 'industries',
    to: '/app/industries',
    icon: 'ri-building-2-line',
    group: 'menu',
  },
  {
    name: 'methodologies',
    to: '/app/methodologies',
    icon: 'ri-pie-chart-2-line',
    group: 'admin',
  },

  {
    name: 'questionnaires',
    to: '/app/questionnaires',
    icon: 'ri-pie-chart-2-line',
    group: 'admin',
  },

  {
    name: 'logs',
    to: '/app/questionnaires',
    icon: 'ri-list-check-2',
    group: 'admin',
  },

  {
    name: 'logout',
    to: '/auth/logout',
    icon: 'ri-logout-box-line',
    group: 'admin',
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
  const { user, token } = await validateCookie(request);
  if (!user) return redirect('/', { headers: { 'Set-Cookie': await appCookie.serialize('', { maxAge: 0 }) } });

  return json({ user });
};

export default function App() {
  const { pathname } = useLocation();
  const { user } = useLoaderData<typeof loader>();
  const { setUser } = useAppStore.user((state) => state);
  const { ratingsData } = useRatingStore((state) => state);
  const [breadcrumb, setBreadcrumb] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => setUser(user as User), [user]);

  useEffect(() => {
    const crumbs = pathname.split('/').filter(Boolean);
    const crumbsSlice = crumbs.slice(0, crumbs.length - 1);

    const breadcrumb = crumbs
      .map((el) => {
        const idToName = ratingsData.filter((ell) => ell.id === el)[0];
        return {
          name: idToName?.clientName || el,
          path: `${crumbsSlice.slice(1, crumbs.indexOf(el) + 1).join('/')}`,
        };
      })
      .filter((el) => el.name?.toLowerCase() !== 'app')
      .filter((el) => el.name?.toLowerCase() !== 'files-uploads');

    setBreadcrumb(breadcrumb);
  }, [pathname, ratingsData]);

  return (
    <MenuLayout links={MenuLinks} settings={SettingsLinks}>
      <div className="my-2 mt-3 text-sm capitalize breadcrumbs">
        <ul>
          <li>
            <Link to="/app/dashboard">Home</Link>
          </li>
          {breadcrumb.map((el, i) => (
            <li key={i}>{i === breadcrumb.length - 1 ? el?.name : <Link to={`${el.path}`}>{el.name}</Link>}</li>
          ))}
        </ul>
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <footer className="flex items-center justify-between py-4 text-xs font-bold">
        <div className="opacity-40"> &copy; Copyright Agusto & Co.{dayjs().format('YYYY')}. </div>

        <div className="flex items-center justify-start gap-4 text-xs opacity-40">
          {/*   <a href="#">Term of service</a> */}
          <a href="https://www.agusto.com/privacy-policy/">Privacy Policy</a>
        </div>
      </footer>
    </MenuLayout>
  );
}
