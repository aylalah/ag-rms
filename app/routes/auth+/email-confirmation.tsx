import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = ({ request }: LoaderFunctionArgs) => {
  const email = new URL(request.url).searchParams.get('email');
  return { email };
};

export default function EmailConfirmation() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center flex-1 h-screen bg-primary map">
      <div className="bg-base-100 w-[31em] p-4 rounded-lg flex flex-col">
        <div className="flex flex-col items-center justify-center gap-4 p-8 border-b">
          <h1 className="text-2xl font-bold">Email Confirmation</h1>
          <div className="text-center opacity-70">
            We have sent an email to <span className="font-bold text-secondary">{email}</span>.<br />
            Please click on the link to login to the portal
          </div>
        </div>

        <p className="p-4 text-sm text-center opacity-60">
          if you don't receive the email, please check your spam folder
        </p>
      </div>
    </div>
  );
}
