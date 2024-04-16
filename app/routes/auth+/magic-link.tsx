import { json, LoaderFunctionArgs, redirectDocument } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const regToken = new URL(request.url).searchParams.get('token');
  const { client, token, error } = await RMSservice().auth.magicLinkLogin(regToken as string);

  if (client && token) {
    return redirectDocument('/client/ratings', {
      headers: { 'set-cookie': await appCookie.serialize(JSON.stringify({ token, client })) },
    });
  }

  return json({ error });
};

export default function MagicLink() {
  <div></div>;
}
