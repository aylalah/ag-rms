import MenuLayout from '@layouts/menu-layout';
import { Icons } from '@components';
import { Outlet } from '@remix-run/react';

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
    to: '/admin/methodologies',
    icon: 'Methodology',
    group: 'admin',
  },

  {
    name: 'questionnaires',
    to: '/admin/questionnaires',
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

export default function App() {
  return (
    <MenuLayout links={groupedClientRoutes}>
      <Outlet />
    </MenuLayout>
  );
}
