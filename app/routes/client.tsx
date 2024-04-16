import dayjs from 'dayjs';
import MenuLayout from '@layouts/menu-layout';
import useAppStore from '@stores';
import { appCookie, validateCookie } from '@helpers/cookies';
import { Icons } from '@components';
import {
  json,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  redirect
  } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

const sortOrder = ['menu', 'admin'];

const MenuLinks = [
  /*  {
    name: 'dashboard',
    to: '/client/dashboard',
    icon: 'Dashboard',
    group: 'menu',
  }, */
  {
    name: 'ratings',
    to: '/client/ratings',
    icon: 'Ratings',
    group: 'menu',
  },
];

const SettingsLinks = [
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
  const { token, client } = await validateCookie(request);
  if (!client) return redirect('/', { headers: { 'Set-Cookie': await appCookie.serialize('', { maxAge: 0 }) } });
  return json({ client });
};

export default function App() {
  const { client } = useLoaderData<typeof loader>();
  const { setClient } = useAppStore.user((state) => state);
  useEffect(() => setClient(client as any), [client]);

  return (
    <MenuLayout links={MenuLinks} settings={SettingsLinks}>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <footer className="flex items-center justify-between py-4 text-xs font-bold ">
        <div className="opacity-40"> &copy; Copyright Agusto & Co.{dayjs().format('YYYY')}. </div>

        <div className="flex items-center justify-start gap-4 text-xs opacity-40">
          <a href="#">Term of service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </MenuLayout>
  );
}
