import dayjs from 'dayjs';
import { defer, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = Number(new URL(request.url).searchParams.get('page')) || 1;
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 15;

  const queryData = RMSservice(token)
    .ratings.all({
      limit,
      page,
      include: { clientModel: true, ratingClassModel: true },
      where: { clientModel: { companyName: { contains: search } } },
    })
    .then((res) => {
      const { ratings, error } = res || {};
      const { docs, ...meta } = ratings || {};
      const thead = ['ratingClass', 'ratingYear', 'issueDate', 'expiryDate'];
      const tbody = docs?.map((rating) => ({
        ...rating,
        createdAt: dayjs(rating.createdAt).format('MMMM DD, YYYY'),
        updatedAt: dayjs(rating.updatedAt).format('MMMM DD, YYYY'),
      }));

      return { thead, tbody, meta, error, searchTitle: 'Search by ratings' };
    });
  return defer({ queryData });
};

export const RatingLoader = loader;
