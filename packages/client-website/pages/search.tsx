import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Content from '../components/layout/Content';

export interface SearchProps {
  query?: string;
  products?: string[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products } = props;

  return (
    <Content>
      <p>Hello from Search</p>
      <p>
        Showing {products?.length || 0} results for: {query}
      </p>
      <div>
        {products?.map((product, index) => (
          <p key={index}>{product}</p>
        ))}
      </div>
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

  return {
    props: { query: q, products: ['product1', 'product2'] },
  };
}
