import LoginForm from '@ui/forms/login';
import RMSservice from '@modules/services';
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
    const { token, user, error } = await RMSservice().auth.login(body);

    if (token) {
      return redirectDocument('/app/dashboard', {
        headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, user })) },
      });
    }

    return json({ error });
  } catch (error) {
    console.error(error);
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
    <div className="flex h-screen bg-primary">
      <div className="flex-1 bg-primary"></div>

      <div className="flex items-center justify-center w-full lg:w-[35em] p-6">
        <LoginForm />
      </div>
    </div>
  );
}
