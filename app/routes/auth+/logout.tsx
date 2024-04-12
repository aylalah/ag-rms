import { appCookie } from '@helpers/cookies';
import { redirect } from '@remix-run/node';

export const loader = async () => {
  throw redirect('/', {
    headers: {
      'set-cookie': await appCookie.serialize('', { maxAge: -1, path: '/' }),
    },
  });
};

export default function SignOut() {
  return <div>Sign Out</div>;
}
