import { Flex, Typography } from '@project/ui';
import ProductCard from '../ProductCard';
import ResultStats from '../ResultStats';
import SortFilter from '../SortFilter';
import { EnhancedProduct, SortOption } from '../../types';
import styles from './SearchResults.module.scss';

export interface SearchResultsProps {
  products: EnhancedProduct[];
  query: string;
  sortOptions: SortOption[];
  sortKey: string;
  onSort: (value: string) => void;
}

export default function SearchResults(props: SearchResultsProps): JSX.Element {
  const { products, query, sortOptions, sortKey, onSort } = props;

  return (
    <Flex container>
      <Flex
        container
        item
        xs={12}
        justifyContent="space-between"
        className={styles.header}
      >
        <Flex item>
          <ResultStats numberOfResults={products.length || 0} query={query} />
        </Flex>
        <Flex item>
          <SortFilter options={sortOptions} sortKey={sortKey} onSort={onSort} />
        </Flex>
      </Flex>
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
