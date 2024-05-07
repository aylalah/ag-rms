import LoginForm from '@ui/forms/login';
import { ActionFunctionArgs, json, redirectDocument } from '@remix-run/node';
import { appCookie } from '@helpers/cookies';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const fd = await request.formData();
    const body = loginSchema.parse(Object.fromEntries(fd));
    const { token, user, error, apiToken, client, message } = await RMSservice().auth.login(body);

    if (message) {
      return redirectDocument(`/auth/client-validation?email=${body.email}`, {
        headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, apiToken, user })) },
      });
    }

    if (token && user) {
      return redirectDocument('/app/dashboard', {
        headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, apiToken, user })) },
      });
    }

    if (client && token) {
      return redirectDocument('/client/dashboard', {
        headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, client })) },
      });
    }

    return json({ error });
  } catch (error) {
    return { error: 'Unable to login at this time. Please try again later.' };
  }
};

export default function Index() {
  const fetcher = useFetcher({ key: 'login' });
  const fetcherData = fetcher.data as { error: string };

  useEffect(() => {
    if (fetcherData?.error) toast.error(fetcherData?.error, { toastId: 'login-error' });
  }, [fetcherData]);

  return (
    <div className="flex h-screen bg-primary map">
      <div className="flex flex-col justify-center gap-6 flex-1 p-[10em] text-white relative">
        <h1 className="text-7xl font-bold leading-[1.1em]">
          Agusto Rating
          <br />
          Management System
        </h1>

        <p className="text-xl leading-[1.6em] opacity-70">
          Strengthen your creditworthiness with the Agusto Rating Management System. Our streamlined platform simplifies
          data collection, ensuring a transparent and efficient rating process for informed decision-making.
        </p>

        <p className="absolute text-base opacity-60 bottom-10">&copy; {new Date().getFullYear()}. Agusto & Co. Ltd</p>
      </div>

      <div className="flex items-center justify-center w-full lg:w-[35em] p-6">
        <LoginForm />
      </div>
    </div>
  );
}

//https://dev.localhost/auth/magic-link?token=an6aq73luk4k7g04j0tx7a
