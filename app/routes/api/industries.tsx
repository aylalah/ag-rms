import dayjs from "dayjs";
import { defer, json, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get("search") || "";
  const page = Number(new URL(request.url).searchParams.get("page")) || 1;
  const limit = Number(new URL(request.url).searchParams.get("limit")) || 15;

  const queryData = await RMSservice(token)
    .industries.all({ limit, page, orderBy: { name: "asc" }, where: { name: { contains: search } } })
    .then((res) => {
      const { industries, error } = res || {};
      const { docs, ...meta } = industries || {};
      const thead = ["name", "createdAt", "updatedAt"];
      const tbody = docs?.map((industry) => ({
        ...industry,
        createdAt: dayjs(industry.createdAt).format("MMMM DD, YYYY"),
        updatedAt: dayjs(industry.updatedAt).format("MMMM DD, YYYY"),
      }));
      return { thead, tbody, meta, error, searchTitle: "Search by industries" };
    });
  return json({ queryData });
};

export const IndustryLoader = loader;
