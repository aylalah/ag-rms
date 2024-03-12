import Loader from '@ui/elements/loader';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useFetchers } from '@remix-run/react';
import { ToastContainer } from 'react-toastify';
import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = ({ location }) => {
  const { pathname } = location;
  const subTitle = pathname?.split('/').pop();
  return [{ title: `Rating Management System ${subTitle && `- ${capitalize(subTitle)}`}` }];
};

export default function App() {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Loader />
        <ToastContainer hideProgressBar={true} closeOnClick autoClose={2000} pauseOnHover={true} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
