import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Typography } from '@project/ui';
import { SortOption } from '../../types';
import styles from './SortFilter.module.scss';

export interface SortFilterProps {
  options: SortOption[];
  sortKey: string;
  onSort: (value: string) => void;
}

export default function SortFilter(props: SortFilterProps): JSX.Element {
  const { options, sortKey, onSort } = props;
  const router = useRouter();

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    onSort(e.target.value);
  }

  function getDefaultValue(): string | undefined {
    const value = router.query[sortKey];
    const selectedOption = options.find((option) => option.value === value);

    return selectedOption?.value;
  }

  return (
    <Flex container>
      <Flex item>
        <Typography className={styles.label}>Sort by</Typography>
      </Flex>
      <Flex item>
        <select onChange={handleSelectChange} defaultValue={getDefaultValue()}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Flex>
    </Flex>
  );
}
