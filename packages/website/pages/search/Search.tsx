import { Flex } from '@project/ui';
import Content from '../../components/layout/Content';
import { useAppDispatch } from '../../store/hooks';
import { filter, sort } from './searchSlice';
import { FilterBar, Results, ResultsHeader } from './components';
import { EnhancedProduct, Filter, SortOption } from './types';
import styles from './Search.module.scss';

export interface SearchProps {
  query: string;
  products: EnhancedProduct[];
  filters: Filter[];
  sortOptions: SortOption[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, filters, sortOptions } = props;
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
