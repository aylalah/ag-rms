import { json, LoaderFunctionArgs, redirectDocument } from '@remix-run/node';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';

export const loader = ({ request }: LoaderFunctionArgs) => {
  const email = new URL(request.url).searchParams.get('email');
  return { email };
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const fd = await request.formData();
  const body = Object.fromEntries(fd.entries()) as { email: string; token: string };
  const { client, token, error } = await RMSservice().auth.magicLinkLogin(body);

  if (client && token) {
    return redirectDocument('/client/ratings', {
      headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, client })) },
    });
  }

  return json({ error });
};

const token = 985174;

export default function EmailConfirmation() {
  const Fetcher = useFetcher();
  const FetcherData = Fetcher?.data as { error: string };
  const { email } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (FetcherData?.error) {
      toast.error(FetcherData?.error, { toastId: 'login-error' });
      return;
    }
  }, [FetcherData]);

  return (
    <div className="flex items-center justify-center flex-1 h-screen bg-primary map">
      <div className="bg-base-100 w-[28em] p-4 rounded-lg flex flex-col">
        <div className="flex flex-col items-center justify-center gap-4 p-8 border-b">
          <h1 className="text-2xl font-bold">2 Factor Authentication</h1>
          <div className="text-sm text-center opacity-70">
            We have sent an email to <span className="font-bold text-secondary">{email}</span>.<br />
            Please enter your six digit token to continue
          </div>

          <Fetcher.Form method="post" className="w-full">
            <fieldset className="flex flex-col w-full gap-2">
              <input
                type="hidden"
                max={6}
                maxLength={6}
                defaultValue={`${email}`}
                className="w-full text-xl font-semibold text-center input input-bordered"
              />
              <input
                defaultValue={`${token}`}
                type="number"
                name="token"
                className="w-full text-xl font-semibold text-center input input-bordered"
              />
              <button className="w-full p-2 btn btn-secondary">Continue</button>
            </fieldset>
          </Fetcher.Form>
        </div>

        <p className="p-4 text-sm text-center opacity-60">
          if you don't receive the email, please check your spam folder
        </p>
      </div>
    </div>
  );
}
