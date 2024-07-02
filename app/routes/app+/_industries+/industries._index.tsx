import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ListLayout } from "@layouts/list-layout";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const loader = async (ctx: LoaderFunctionArgs) => {
  return IndustryLoader(ctx);
};

export default function Industries() {
  const { queryData } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (queryData?.error) toast.error(queryData.error, { toastId: "industries" });
  }, []);

  return (
    <div className="flex-1 h-full overflow-hidden">
      {queryData && (
        <ListLayout
          createLink="/app/industries/create"
          editLink="/app/industries/edit/"
          tbody={queryData?.tbody}
          thead={queryData?.thead}
          meta={queryData?.meta as any}
          title="Industries"
          searchTitle={queryData?.searchTitle}
        />
      )}
    </div>
  );
}
