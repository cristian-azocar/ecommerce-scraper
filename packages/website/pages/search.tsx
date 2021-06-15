import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Flex } from '@project/ui';
import db, { Category, Product } from '@project/database';
import { safeSerialize } from '../utils';
import Content from '../components/layout/Content';
import ProductCard from '../components/product/ProductCard';
import { ResultStats, ResultsNotFound } from '../components/search';
import SearchFilters from '../components/search/SearchFilters';

export interface SearchProps {
  query?: string;
  products?: Product[];
  categories?: Category[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, categories } = props;

  if (!products?.length || !query) {
    return (
      <Content>
        <ResultsNotFound />
      </Content>
    );
  }

  return (
    <Content>
      <Flex container>
        <Flex item xs={2}>
          <SearchFilters />
        </Flex>
        <Flex container item xs={10}>
          <Flex item xs={12}>
            <ResultStats numberOfResults={products.length} query={query} />
          </Flex>
          {products?.map((product) => (
            <Flex item xs={6} sm={3} key={product.id}>
              <ProductCard product={product} />
            </Flex>
          ))}
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

  const products = await db.product.findByName(q);
  const categories = await db.category.findAll();

  return {
    props: {
      query: q,
      products: safeSerialize(products),
      categories: safeSerialize(categories),
    },
  };
}
