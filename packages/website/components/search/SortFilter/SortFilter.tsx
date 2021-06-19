import React from 'react';
import { useRouter } from 'next/router';
import { Flex, FlexProps, Typography } from '@project/ui';
import styles from './SortFilter.module.scss';

export interface SortOption {
  label: string;
  value: string;
  name?: string;
  order?: 'asc' | 'desc';
}

export interface SortFilterProps extends FlexProps {
  options: SortOption[];
}

export default function SortFilter(props: SortFilterProps): JSX.Element {
  const { options } = props;
  const router = useRouter();

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const select = e.target;
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('sortBy', select.value);

    window.location.search = urlParams.toString();
  }

  function getDefaultValue(): string | undefined {
    const { sortBy } = router.query;
    const selectedOption = options.find((option) => option.value === sortBy);

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
