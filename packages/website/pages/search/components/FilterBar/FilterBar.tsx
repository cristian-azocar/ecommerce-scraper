import clsx from 'clsx';
import { Flex } from '@project/ui';
import FilterSection from '../FilterSection';
import styles from './FilterBar.module.scss';

export interface FilterOption {
  label: string;
  value: string | number | undefined;
  slug: string;
}

export interface Filter {
  title: string;
  slug: string;
  options: FilterOption[];
}

export interface FilterBarProps
  extends React.ComponentPropsWithoutRef<'aside'> {
  filters: Filter[];
}

export default function FilterBar(props: FilterBarProps): JSX.Element {
  const { filters, className, ...rest } = props;
  const classes = clsx([styles.root], className);

  return (
    <aside className={classes} {...rest}>
      <Flex container direction="column">
        {filters?.map((filter) => (
          <FilterSection key={filter.title} filter={filter} />
        ))}
      </Flex>
    </aside>
  );
}
