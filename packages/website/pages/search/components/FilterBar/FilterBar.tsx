import { Flex } from '@project/ui';
import FilterSection from '../FilterSection';
import { Filter } from '../../types';
import styles from './FilterBar.module.scss';

export interface FilterBarProps {
  filters: Filter[];
  onFilter: (name: string, value: string, checked: boolean) => void;
}

export default function FilterBar(props: FilterBarProps): JSX.Element {
  const { filters, onFilter } = props;

  return (
    <aside id="filter-bar" className={styles.root}>
      <Flex container direction="column">
        {filters.map((filter) => (
          <FilterSection
            key={filter.slug}
            filter={filter}
            onFilter={onFilter}
          />
        ))}
      </Flex>
    </aside>
  );
}
