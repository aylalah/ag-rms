import MenuLayout from '@layouts/menu-layout';
import useAppStore from '@stores';
import { appCookie, validateCookie } from '@helpers/cookies';
import { Icons } from '@components';
import { json, LinksFunction, LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
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
  {
    name: 'industries',
    to: '/app/industries',
    icon: 'Industries',
    group: 'menu',
  },

  {
    name: 'methodologies',
    to: '/app/methodologies',
    icon: 'Methodology',
    group: 'admin',
  },

  {
    name: 'questionnaires',
    to: '/app/questionnaires',
    icon: 'Questionnaire',
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
  const { user } = useLoaderData<typeof loader>();
  const { setUser } = useAppStore.user((state) => state);
  useEffect(() => setUser(user as User), [user]);

  return (
    <MenuLayout links={groupedClientRoutes}>
      <Outlet />
    </MenuLayout>
  );
}
