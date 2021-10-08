import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import db, { AvailabilityEnum, CategoryEnum } from '@project/database';
import { SearchProps } from './Search';
import { EnhancedProduct, Filter, SortOption } from './types';
import { safeSerialize } from '../../utils';
import { SORT_KEY, QUERY_KEY } from '../../constants';

// TODO: maybe read this from the database?
const sortOptions: SortOption[] = [
  {
    label: 'Best Matches',
    value: 'best-matches',
  },
  {
    label: 'Price: Low to High',
    value: 'price-low-to-high',
    name: 'price',
    order: 'asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price-high-to-low',
    name: 'price',
    order: 'desc',
  },
];

export default async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SearchProps>> {
  const query = ctx.query[QUERY_KEY];

  if (!query || typeof query !== 'string') {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  const selectedSort = sortOptions.find(
    (option) => option.value === ctx.query[SORT_KEY]
  );
  const orderBy = selectedSort?.name
    ? { [selectedSort.name]: selectedSort.order }
    : {};
  const condition = {
    availabilityId: ctx.query.availability,
    categoryId: ctx.query.category,
  };

  // TODO: try to fetch data in a single query to the database
  const products = await db.product.findByName(query, condition, orderBy);
  const categories = await db.category.findAll();
  const availabilities = await db.availability.findAll();

  const platforms = categories.filter(
    (category) => category.parentId === CategoryEnum.Videogames
  );
  const filters: Filter[] = [
    { title: 'Availability', slug: 'availability', options: availabilities },
    { title: 'Category', slug: 'category', options: platforms },
  ];

  const enhancedProducts = products.map(
    (product): EnhancedProduct => ({
      ...product,
      availability: availabilities.find(
        (availability) => availability.id === product.availabilityId
      ),
      isUnavailable: product.availabilityId !== AvailabilityEnum.Available,
    })
  );

  return {
    props: {
      query,
      products: safeSerialize(enhancedProducts),
      filters: safeSerialize(filters),
      sortOptions,
    },
  };
}
