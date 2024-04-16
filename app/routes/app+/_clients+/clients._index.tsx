import dayjs from 'dayjs';
import { Await, useLoaderData } from '@remix-run/react';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { ListLayout } from '@layouts/list-layout';
import { Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';
import { validateCookie } from '@helpers/cookies';

export const loader = async (ctx: LoaderFunctionArgs) => {
  return ClientLoader(ctx);
};

export default function Clients() {
  const { queryData } = useLoaderData<typeof loader>();
  const { setQueryData, storeQueryData } = useClientStore((state) => state);

  useEffect(() => {
    toast.promise(queryData, { pending: 'Loading clients . . . ' }, { toastId: 'clients' });
    queryData.then((res) => setQueryData(res));
  }, []);

  return (
    <div className="flex-1 h-full overflow-hidden">
      {storeQueryData && (
        <ListLayout
          tableSize="table-fixed"
          createLink="/app/clients/create"
          editLink="/app/clients/"
          tbody={storeQueryData?.tbody}
          thead={storeQueryData?.thead}
          meta={storeQueryData?.meta as any}
          title="Clients"
          searchTitle={storeQueryData?.searchTitle}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
}
