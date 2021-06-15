import { Flex } from '@project/ui';
import styles from './SearchFilters.module.scss';

export default function SearchFilters(): JSX.Element {
  return (
    <div id="search-filters" className={styles.root}>
      <Flex container direction="column" autoGrow>
        <Flex item>Filter by availability</Flex>
        <Flex item>Filter by platform</Flex>
      </Flex>
    </div>
  );
}
