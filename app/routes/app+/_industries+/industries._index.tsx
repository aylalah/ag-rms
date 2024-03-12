import dayjs from 'dayjs';
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
    .industries.all({ limit, page, orderBy: { name: 'asc' }, where: { name: { contains: search } } })
    .then((res) => {
      const { industries, error } = res || {};
      const { docs, ...meta } = industries || {};
      const thead = ['name', 'createdAt', 'updatedAt'];
      const tbody = docs?.map((industry) => ({
        ...industry,
        createdAt: dayjs(industry.createdAt).format('MMMM DD, YYYY'),
        updatedAt: dayjs(industry.updatedAt).format('MMMM DD, YYYY'),
      }));
      return { thead, tbody, meta, error, searchTitle: 'Search by industries' };
    });
  return defer({ queryData });
};

export default function Industries() {
  const { queryData } = useLoaderData<typeof loader>();
  return (
    <div className="flex-1 h-full overflow-hidden">
      <Suspense fallback={<></>}>
        <Await resolve={queryData}>
          {({ thead, tbody, searchTitle, meta }) => (
            <ListLayout
              createLink="/app/industries/create"
              editLink="/app/industries/edit/"
              tbody={tbody}
              thead={thead}
              meta={meta as any}
              title="Industries"
              searchTitle={searchTitle}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
