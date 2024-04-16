import dayjs from 'dayjs';
import { Await, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { ListLayout } from '@layouts/list-layout';
import { Suspense } from 'react';
import { toast } from 'react-toastify';
import { validateCookie } from '@helpers/cookies';

export const loader = async (ctx: LoaderFunctionArgs) => {
  return IndustryLoader(ctx);
};

export default function Industries() {
  const { queryData } = useLoaderData<typeof loader>();
  toast.promise(queryData, { pending: 'Loading industries . . . ' }, { toastId: 'industries' });

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
