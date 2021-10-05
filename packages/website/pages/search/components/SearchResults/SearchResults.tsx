import { Flex, Typography } from '@project/ui';
import ProductCard from '../ProductCard';
import { EnhancedProduct } from '../../types';
import styles from './SearchResults.module.scss';

export interface SearchResultsProps {
  products: EnhancedProduct[];
}

export default function SearchResults(props: SearchResultsProps): JSX.Element {
  const { products } = props;

  return (
    <Flex container className={styles.root}>
      {!products.length ? (
        <Flex item>
          <Typography>Oops, couldn&apos;t find anything :(</Typography>
        </Flex>
      ) : (
        products.map((product) => (
          <Flex item xs={6} sm={3} key={product.id}>
            <ProductCard product={product} />
          </Flex>
        ))
      )}
    </Flex>
  );
}
