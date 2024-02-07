import { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return {};
};

export default function ClientEdit() {
  return (
    <div>
      <h1>Welcome to the client edit page</h1>
    </div>
  );
}
