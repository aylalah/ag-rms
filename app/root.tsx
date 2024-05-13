import Loader from '@ui/elements/loader';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
} from '@remix-run/react';
import { ToastContainer } from 'react-toastify';
import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import AcceptCookieUI from '@ui/elements/accept-cookie-ui';

export const meta: MetaFunction = ({ location }) => {
  const { pathname } = location;
  const subTitle = pathname?.split('/').pop();
  return [{ title: `Rating Management System ${subTitle && `- ${capitalize(subTitle)}`}` }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const acceptedCookie = await validateAcceptedCookie(request);
  return json({ acceptedCookie });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return json({}, { headers: { 'Set-Cookie': await acceptCookie.serialize('true') } });
};

export default function App() {
  const { acceptedCookie } = useLoaderData<typeof loader>();
  const Fetcher = useFetcher();

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <Meta />
        <Links />
      </head>
      <body>
        <Loader />
        <ToastContainer hideProgressBar={true} closeOnClick autoClose={2000} pauseOnHover={true} />
        <Outlet />
        {!acceptedCookie && <AcceptCookieUI Fetcher={Fetcher} />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
