import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Flex } from '@project/ui';
import db, { Product } from '@project/database';
import Content from '../components/layout/Content';
import { createFilter, safeSerialize } from '../utils';
import { FilterBar, Filter } from '../components/search';
import SearchResults from '../components/search/SearchResults';

export interface SearchProps {
  query: string;
  products?: Product[];
  filters: Filter[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, filters } = props;

  return (
    <Content>
      <Flex container>
        <Flex item xs={2}>
          <FilterBar filters={filters} />
        </Flex>
        <Flex item xs={10}>
          <SearchResults products={products} query={query} />
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

  // TODO: move this logic to a dedicated service
  // TODO: try to fetch data in a single query to the database
  const products = await db.product.findByName(q, {
    availabilityId: ctx.query.availability,
    categoryId: ctx.query.category,
  });
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
    },
  };
}
