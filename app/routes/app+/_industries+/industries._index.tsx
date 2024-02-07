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
    .industries.all({ limit: 10, page: 1, orderBy: { name: 'asc' } })
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
