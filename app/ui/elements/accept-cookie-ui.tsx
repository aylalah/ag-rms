import { FetcherWithComponents, NavLink } from '@remix-run/react';
import { useState } from 'react';

type Props = {
  Fetcher: FetcherWithComponents<any>;
};

export default function AcceptCookieUI({ Fetcher }: Props) {
  const [show, setShow] = useState(true);
  const isSubmitting = Fetcher?.state === 'submitting';

  return (
    <div className="fixed top-0 left-0 bg-[#0005] w-full h-screen">
      <div
        className={`${
          show ? 'block' : 'hidden'
        } fixed bottom-0 left-0 right-0 bg-[#232323] z-50 p-6 flex justify-between items-center z-[100]`}
      >
        <div className="flex items-center gap-4">
          <p className="text-sm text-base-100">
            We use cookies to ensure you get the best experience on our website. Kindly read our{' '}
            <a href="https://www.agusto.com/privacy-policy/" className="p-2 py-1 underline bg-secondary">
              Privacy Policy
            </a>{' '}
            to learn more.
          </p>
        </div>

        <Fetcher.Form method="POST">
          <button
            disabled={isSubmitting}
            className="p-2 px-10 text-sm rounded-md btn btn-secondary btn-outline hover:bg-secondary"
          >
            {isSubmitting && <span className="loading loading-xs text-base-100" />}
            Accept Cookies
          </button>
        </Fetcher.Form>
      </div>
    </div>
  );
}
