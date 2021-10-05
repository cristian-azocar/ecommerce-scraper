import { Flex } from '@project/ui';
import Content from '../../components/layout/Content';
import { FilterBar, Results, ResultsHeader } from './components';
import { EnhancedProduct, Filter, SortOption } from './types';
import styles from './Search.module.scss';

export interface SearchProps {
  query: string;
  products: EnhancedProduct[];
  filters: Filter[];
  sortKey: string;
  sortOptions: SortOption[];
}

export default function Search(props: SearchProps): JSX.Element {
  const { query, products, filters, sortKey, sortOptions } = props;

  function applySort(value: string): void {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(sortKey, value);

    window.location.search = urlParams.toString();
  }

  function applyFilter(name: string, value: string, checked: boolean): void {
    const urlParams = new URLSearchParams(window.location.search);
    const filterValues = urlParams.getAll(name);

    if (checked) {
      filterValues.push(value);
    } else {
      const index = filterValues.indexOf(value);
      filterValues.splice(index, 1);
    }

    urlParams.delete(name);

    filterValues.forEach((filterValue) => {
      urlParams.append(name, filterValue);
    });

    window.location.search = urlParams.toString();
  }

  return (
    <Content className={styles.root}>
      <Flex container>
        <Flex item xs={2}>
          <FilterBar filters={filters} onFilter={applyFilter} />
        </Flex>
        <Flex container item xs={10}>
          <Flex item>
            <ResultsHeader
              numberOfResults={products.length}
              query={query}
              sortOptions={sortOptions}
              sortKey={sortKey}
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
