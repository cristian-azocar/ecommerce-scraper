import { Flex, FlexProps, Typography } from '@project/ui';
import { Product } from '@project/database';
import ProductCard from '../../product/ProductCard';
import ResultStats from '../ResultStats';
import SortFilter, { SortOption } from '../SortFilter';
import styles from './SearchResults.module.scss';

export interface SearchResultsProps extends FlexProps {
  products?: Product[];
  query: string;
  sortOptions: SortOption[];
}

export default function SearchResults(props: SearchResultsProps): JSX.Element {
  const { products, query, sortOptions } = props;

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
          <ResultStats numberOfResults={products?.length || 0} query={query} />
        </Flex>
        <Flex item>
          <SortFilter options={sortOptions} />
        </Flex>
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