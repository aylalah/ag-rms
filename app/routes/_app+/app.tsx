import MenuLayout from '@layouts/menu-layout';
import { Outlet } from '@remix-run/react';

const MenuLinks = [
  {
    name: 'dashboard',
    to: '/app/dashboard',
    list: [],
  },
  {
    name: 'clients',
    to: '/app/clients',
    list: [],
  },
  {
    name: 'ratings',
    to: '/app/ratings',
    list: [],
  },
  {
    name: 'industries',
    to: '/admin/industries',
    list: [],
  },
  {
    name: 'resources',
    to: '#',
    list: [
      {
        name: 'methodologies',
        to: '/admin/methodologies',
      },

      {
        name: 'questionnaires',
        to: '/admin/questionnaires',
      },
    ],
  },
];

export default function App() {
  return (
    <MenuLayout links={MenuLinks}>
      <Outlet />
    </MenuLayout>
  );
}
