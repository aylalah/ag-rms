import useAppStore from '@stores';
import { Button, TextInput } from '@components';
import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

/* const email = 'adeolaboluogun@agusto.com';
const password = 'adeola250398'; */

const email = 'bamidelejoel@agusto.com';
const password = 'agusto130476';

export default function LoginForm() {
  const Fetcher = useFetcher({ key: 'login' });
  const isSubmitting = Fetcher.state === 'submitting';
  const { setLoader } = useAppStore.general((state) => state);

  useEffect(() => setLoader(isSubmitting), [isSubmitting]);

  return (
    <Fetcher.Form method="post">
      <fieldset disabled={isSubmitting} className="flex flex-col w-[25em] gap-6 px-10 py-[5em]  bg-base-100">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">User Login</p>
          <p className="text-sm opacity-40">Please enter your email and password to login</p>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <TextInput defaultValue={`${email}`} name="email" type="email" placeholder="Enter you email address" />
          <TextInput defaultValue={`${password}`} name="password" type="password" placeholder="Enter your password" />
          <div className="flex items-center justify-end py-4">
            <a href="/auth/forgot-password" className="text-xs">
              Forgot Password?
            </a>
          </div>
          <Button type="submit" className="btn-secondary">
            LOGIN
          </Button>
        </div>
      </fieldset>
    </Fetcher.Form>
  );
}
