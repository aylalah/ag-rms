import dayjs from "dayjs";
import { defer, json, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get("search") || "";
  const page = Number(new URL(request.url).searchParams.get("page")) || 1;
  const limit = Number(new URL(request.url).searchParams.get("limit")) || 15;
  const sort = new URL(request.url).searchParams.get("sort") || {
    companyName: "asc",
  };

  const queryData = await RMSservice(token)
    .clients.all({
      limit,
      page,
      orderBy: sort as any,
      where: {
        OR: [
          { companyName: { contains: search, mode: "insensitive" } },
          {
            industryModel: { name: { contains: search, mode: "insensitive" } },
          },
          { country: { contains: search, mode: "insensitive" } },
          { companyPhoneNumbers: { contains: search, mode: "insensitive" } },
        ],
      },
      include: { industryModel: true },
    })
    .then((res) => {
      const { clients, error } = res || {};
      const { docs, ...meta } = clients || {};
      const thead = ["companyName", "industry", "country", "createdAt"];
      const tbody = docs?.map((client) => ({
        ...client,
        industry: client?.industryModel?.name,
        createdAt: dayjs(client.createdAt).format("MMMM DD, YYYY"),
      }));

      return {
        thead,
        tbody,
        meta,
        error,
        searchTitle:
          "Search by clients, emails, industries, phone & countries ",
      };
    });
  return json({ queryData });
};

export const ClientLoader = loader;
