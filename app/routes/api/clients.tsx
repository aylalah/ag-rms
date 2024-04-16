import dayjs from 'dayjs';
import { defer, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = Number(new URL(request.url).searchParams.get('page')) || 1;
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 15;
  const sort = new URL(request.url).searchParams.get('sort') || { companyName: 'asc' };

  const queryData = RMSservice(token)
    .clients.all({
      limit,
      page,
      orderBy: sort as any,
      where: {
        OR: [
          { companyName: { contains: search } },
          { industryModel: { name: { contains: search } } },
          { country: { contains: search } },
          { email: { contains: search } },
          { companyPhoneNumbers: { contains: search } },
        ],
      },
      include: { industryModel: true },
    })
    .then((res) => {
      const { clients, error } = res || {};
      const { docs, ...meta } = clients || {};
      const thead = ['companyName', 'industry', 'country', 'createdAt'];
      const tbody = docs?.map((client) => ({
        ...client,
        industry: client?.industryModel?.name,
        createdAt: dayjs(client.createdAt).format('MMMM DD, YYYY'),
      }));
      return { thead, tbody, meta, error, searchTitle: 'Search by clients, emails, industries, phone & countries ' };
    });
  return defer({ queryData });
};

export const ClientLoader = loader;
