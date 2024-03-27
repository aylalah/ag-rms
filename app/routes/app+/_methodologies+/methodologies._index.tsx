import dayjs from 'dayjs';
import { Await, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { ListLayout } from '@layouts/list-layout';
import { Suspense } from 'react';
import { toast } from 'react-toastify';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = Number(new URL(request.url).searchParams.get('page')) || 1;
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 15;

  const queryData = RMSservice(token)
    .methodologies.all({ limit, page, orderBy: { name: 'asc' }, where: { name: { contains: search } } })
    .then((res) => {
      const { methodologies, error } = res || {};
      const { docs, ...meta } = methodologies || {};
      const thead = ['name', 'hasUrl', 'createdAt', 'updatedAt'];
      const tbody = docs?.map((methodology) => ({
        ...methodology,
        hasUrl: methodology.url ? 'Yes' : 'No',
        createdAt: dayjs(methodology.createdAt).format('MMMM DD, YYYY'),
        updatedAt: dayjs(methodology.updatedAt).format('MMMM DD, YYYY'),
      }));
      return { thead, tbody, meta, error, searchTitle: 'Search by methodologies' };
    });
  return defer({ queryData });
};

export default function Industries() {
  const { queryData } = useLoaderData<typeof loader>();
  toast.promise(queryData, { pending: 'Loading ratings . . . ' }, { toastId: 'ratings' });

  return (
    <div className="flex-1 h-full overflow-hidden">
      <Suspense fallback={<></>}>
        <Await resolve={queryData}>
          {({ thead, tbody, searchTitle, meta }) => (
            <ListLayout
              tableSize="table-fixed"
              createLink="/app/methodologies/create"
              editLink="/app/methodologies/edit/"
              tbody={tbody}
              thead={thead}
              meta={meta as any}
              title="Methodologies"
              searchTitle={searchTitle}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
