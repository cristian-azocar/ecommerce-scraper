import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Product } from '@project/database';
import { safeSerialize } from '@project/utils';
import Content from '../components/layout/Content';
import ProductService from '../services/ProductService';

export interface SearchProps {
  query?: string;
  products?: Product[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products } = props;

  return (
    <Content>
      <p>
        Showing {products?.length || 0} results for: {query}
      </p>
      <div>
        {products?.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </Content>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SearchProps>> {
  const { q } = ctx.query;
  const productService = new ProductService();

  if (!q || typeof q !== 'string') {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  const products = await productService.findByName(q);
  const serialized = safeSerialize<Product[]>(products);

  return {
    props: { query: q, products: serialized },
  };
}
