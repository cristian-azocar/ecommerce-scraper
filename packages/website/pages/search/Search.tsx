import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Flex } from '@project/ui';
import db, { Product } from '@project/database';
import Content from '../../components/layout/Content';
import { FilterBar, SearchResults } from './components';
import { safeSerialize } from '../../utils';
import { Filter, SortOption } from './types';
import styles from './Search.module.scss';

const sortKey = 'sortBy';

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

export interface SearchProps {
  query: string;
  products: Product[];
  filters: Filter[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, filters } = props;

  function applySort(value: string): void {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(sortKey, value);

    window.location.search = urlParams.toString();
  }

  function applyFilter(name: string, value: string, checked: boolean): void {
    const urlParams = new URLSearchParams(window.location.search);
    const filterValues = urlParams.getAll(name);

    if (checked) {
      filterValues.push(value);
    } else {
      const index = filterValues.indexOf(value);
      filterValues.splice(index, 1);
    }

    urlParams.delete(name);

    filterValues.forEach((filterValue) => {
      urlParams.append(name, filterValue);
    });

    window.location.search = urlParams.toString();
  }

  return (
    <Content className={styles.root}>
      <Flex container>
        <Flex item xs={2}>
          <FilterBar filters={filters} onFilter={applyFilter} />
        </Flex>
        <Flex item xs={10}>
          <SearchResults
            products={products}
            query={query}
            sortOptions={sortOptions}
            sortKey={sortKey}
            onSort={applySort}
          />
        </Flex>
      </Flex>
    </Content>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SearchProps>> {
  const { q } = ctx.query;

  if (!q || typeof q !== 'string') {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  const selectedSort = sortOptions.find(
    (option) => option.value === ctx.query[sortKey]
  );
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
  const filters: Filter[] = [
    { title: 'Availability', slug: 'availability', options: availabilities },
    { title: 'Category', slug: 'category', options: platforms },
  ];

  return {
    props: {
      query: q,
      products: safeSerialize(products),
      filters: safeSerialize(filters),
    },
  };
}
