import { Flex, FlexProps, Typography } from '@project/ui';
import { Product } from '@project/database';
import ProductCard from '../../product/ProductCard';
import ResultStats from '../ResultStats';

export interface SearchResultsProps extends FlexProps {
  products?: Product[];
  query: string;
}

export default function SearchResults(props: SearchResultsProps): JSX.Element {
  const { products, query } = props;

  return (
    <Flex container>
      <Flex item xs={12}>
        <ResultStats numberOfResults={products?.length || 0} query={query} />
      </Flex>
      {!products?.length ? (
        <Flex item>
          <Typography>Oops, couldn&apos;t find anything :(</Typography>
        </Flex>
      ) : (
        products?.map((product) => (
          <Flex item xs={6} sm={3} key={product.id}>
            <ProductCard product={product} />
          </Flex>
        ))
      )}
    </Flex>
  );
}
