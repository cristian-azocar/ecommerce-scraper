import React from 'react';
import { Typography, Checkbox } from '@project/ui';
import { Filter, FilterOption } from '../FilterBar';
import { isBrowser } from '../../../utils';
import styles from './FilterSection.module.scss';

export interface FilterSectionProps
  extends React.ComponentPropsWithoutRef<'section'> {
  filter: Filter;
}

export default function FilterSection(props: FilterSectionProps): JSX.Element {
  const { filter, ...rest } = props;

  function handleCheckboxClick(e: React.FormEvent<HTMLInputElement>): void {
    const checkbox = e.target as HTMLInputElement;
    const urlParams = new URLSearchParams(window.location.search);
    const filterValues = urlParams.getAll(checkbox.name);

    if (checkbox.checked) {
      filterValues.push(checkbox.value);
    } else {
      const index = filterValues.indexOf(checkbox.value);
      filterValues.splice(index, 1);
    }

    urlParams.delete(checkbox.name);
    filterValues.forEach((value) => {
      urlParams.append(checkbox.name, value);
    });

    window.location.search = urlParams.toString();
  }

  function isChecked(option: FilterOption): boolean {
    if (isBrowser()) {
      const urlParams = new URLSearchParams(window.location.search);
      const values = urlParams.getAll(filter.slug);

      return values.some((value) => value === option.value?.toString());
    }

    return false;
  }

  return (
    <section className="filter-section" {...rest}>
      <Typography className={styles.title}>{filter.title}</Typography>
      <ul>
        {filter.options.map((option) => (
          <li key={option.value}>
            <Checkbox
              value={option.value}
              inputProps={{
                name: filter.slug,
                defaultChecked: isChecked(option),
                onClick: handleCheckboxClick,
              }}
            >
              {option.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </section>
  );
}
