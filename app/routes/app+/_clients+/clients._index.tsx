import dayjs from 'dayjs';
import RMSservice from '@modules/services';
import { Await, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { ListLayout } from '@layouts/list-layout';
import { Suspense } from 'react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);

  const queryData = RMSservice(token)
    .clients.all({ limit: 10, page: 1, include: { industryModel: true } })
    .then((res) => {
      const { clients, error } = res || {};
      const { docs, ...meta } = clients || {};
      const thead = ['companyName', 'companyEmail', 'industry', 'companyPhoneNumbers', 'country', 'createdAt'];
      const tbody = docs?.map((client) => ({
        ...client,
        industry: client?.industryModel?.name,
        createdAt: dayjs(client.createdAt).format('MMMM DD, YYYY'),
      }));
      return { thead, tbody, meta, error, searchTitle: 'Search Clients' };
    });
  return defer({ queryData });
};

export default function Clients() {
  const { queryData } = useLoaderData<typeof loader>();
  return (
    <div className="flex-1 h-full overflow-hidden">
      <Suspense fallback={<></>}>
        <Await resolve={queryData}>
          {({ thead, tbody, searchTitle, meta }) => (
            <ListLayout
              createLink="/app/clients/create"
              editLink="/app/clients/$id"
              tbody={tbody}
              thead={thead}
              meta={meta as any}
              title="Clients"
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
