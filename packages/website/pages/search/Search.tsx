import { Flex } from '@project/ui';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import db, { AvailabilityEnum, CategoryEnum } from '@project/database';
import Content from '../../components/layout/Content';
import { useAppDispatch } from '../../store/hooks';
import { filter, sort } from '../../store/slices/searchSlice';
import { FilterBar, Results, ResultsHeader } from '../../components/search';
import { EnhancedProduct, Filter, SortOption } from '../../types';
import styles from './Search.module.scss';
import { safeSerialize } from '../../utils';

export interface SearchProps {
  query: string;
  products?: EnhancedProduct[];
  filters?: Filter[];
}

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

export default function Search(props: SearchProps): JSX.Element {
  const { query, products = [], filters = [] } = props;
  const dispatch = useAppDispatch();

  function applySort(value: string): void {
    dispatch(sort(value));
  }

  function applyFilter(name: string, value: string, checked: boolean): void {
    dispatch(filter({ name, value, checked }));
  }

  return (
    <Content className={styles.root}>
      <Flex container>
        <Flex item xs={2}>
          <FilterBar filters={filters} onFilter={applyFilter} />
        </Flex>
        <Flex container item xs={10} direction="column">
          <Flex item>
            <ResultsHeader
              numberOfResults={products.length}
              query={query}
              sortOptions={sortOptions}
              onSort={applySort}
            />
          </Flex>
          <Flex item>
            <Results products={products} />
          </Flex>
        </Flex>
      </Flex>
    </Content>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SearchProps>> {
  const query = ctx.query.q;

  if (!query || typeof query !== 'string') {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  const selectedSort = sortOptions.find(
    (option) => option.value === ctx.query.sort
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
    },
  };
}
