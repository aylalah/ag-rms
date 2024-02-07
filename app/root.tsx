import Loader from '@ui/elements/loader';
import tailwind from './styles/tailwind.css';
import toastify from 'react-toastify/dist/ReactToastify.css';
import useAppStore from '@stores';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useFetchers } from '@remix-run/react';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  { rel: 'stylesheet', href: toastify },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
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
        <LiveReload />
      </body>
    </html>
  );
}
