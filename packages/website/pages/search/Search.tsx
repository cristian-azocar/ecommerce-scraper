import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Flex } from '@project/ui';
import db, { Product } from '@project/database';
import Content from '../../components/layout/Content';
import { createFilter, safeSerialize } from '../../utils';
import { FilterBar, Filter, SearchResults, SortOption } from './components';
import styles from './Search.module.scss';

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

export interface SearchProps {
  query: string;
  products?: Product[];
  filters: Filter[];
  sortOptions: SortOption[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, filters } = props;

  return (
    <Content className={styles.root}>
      <Flex container>
        <Flex item xs={2}>
          <FilterBar filters={filters} />
        </Flex>
        <Flex item xs={10}>
          <SearchResults
            products={products}
            query={query}
            sortOptions={sortOptions}
          />
        </Flex>
      </Flex>
    </Content>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SearchProps>> {
  const { q, sortBy } = ctx.query;

  if (!q || typeof q !== 'string') {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  const selectedSort = sortOptions.find((option) => option.value === sortBy);
  const orderBy = selectedSort?.name
    ? { [selectedSort.name]: selectedSort.order }
    : {};
  const condition = {
    availabilityId: ctx.query.availability,
    categoryId: ctx.query.category,
  };

  // TODO: move this logic to a dedicated service
  // TODO: try to fetch data in a single query to the database
  const products = await db.product.findByName(q, condition, orderBy);
  const categories = await db.category.findAll();
  const availabilities = await db.availability.findAll();

  // TODO: avoid hard-coding the "parentId"
  const platforms = categories.filter((category) => category.parentId === 3);
  const filters = [
    createFilter('Availability', 'availability', availabilities),
    createFilter('Category', 'category', platforms),
  ];

  return {
    props: {
      query: q,
      products: safeSerialize(products),
      filters,
      sortOptions,
    },
  };
}
