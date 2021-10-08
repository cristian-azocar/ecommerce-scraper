import React from 'react';
import { Typography, Checkbox } from '@project/ui';
import { useRouter } from 'next/router';
import { Filter, FilterOption } from '../../types';
import styles from './FilterSection.module.scss';

export interface FilterSectionProps {
  filter: Filter;
  onFilter: (name: string, value: string, checked: boolean) => void;
}

export default function FilterSection(props: FilterSectionProps): JSX.Element {
  const { filter, onFilter } = props;
  const router = useRouter();

  function handleCheckboxClick(e: React.FormEvent<HTMLInputElement>): void {
    const { name, value, checked } = e.target as HTMLInputElement;
    onFilter(name, value, checked);
  }

  function isChecked(option: FilterOption): boolean {
    const values = router.query[filter.slug];

    if (Array.isArray(values)) {
      return values.some((value) => value === option.id.toString());
    }

    return values === option.id.toString();
  }

  return (
    <section className="filter-section">
      <Typography className={styles.title}>{filter.title}</Typography>
      <ul>
        {filter.options.map((option) => (
          <li key={option.id}>
            <Checkbox
              value={option.id}
              inputProps={{
                name: filter.slug,
                defaultChecked: isChecked(option),
                onClick: handleCheckboxClick,
              }}
            >
              {option.name}
            </Checkbox>
          </li>
        ))}
      </ul>
    </section>
  );
}
