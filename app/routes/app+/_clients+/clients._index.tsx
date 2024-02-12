import dayjs from 'dayjs';
import RMSservice from '@modules/services';
import { Await, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { ListLayout } from '@layouts/list-layout';
import { Suspense } from 'react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = Number(new URL(request.url).searchParams.get('page')) || 1;
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 15;

  const queryData = RMSservice(token)
    .clients.all({
      limit,
      page,
      where: {
        OR: [
          { companyName: { contains: search } },
          { industryModel: { name: { contains: search } } },
          { country: { contains: search } },
          { companyEmail: { contains: search } },
          { companyPhoneNumbers: { contains: search } },
        ],
      },
      include: { industryModel: true },
    })
    .then((res) => {
      const { clients, error } = res || {};
      const { docs, ...meta } = clients || {};
      const thead = ['companyName', 'companyEmail', 'industry', 'companyPhoneNumbers', 'country', 'createdAt'];
      const tbody = docs?.map((client) => ({
        ...client,
        industry: client?.industryModel?.name,
        createdAt: dayjs(client.createdAt).format('MMMM DD, YYYY'),
      }));
      return { thead, tbody, meta, error, searchTitle: 'Search by clients, emails, industries, phone & countries ' };
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
              editLink="/app/clients/"
              tbody={tbody}
              thead={thead}
              meta={meta as any}
              title="Clients"
              searchTitle={searchTitle}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
