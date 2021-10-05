import { Flex } from '@project/ui';
import SortFilter, { SortFilterProps } from '../SortFilter';
import ResultsStats, { ResultsStatsProps } from '../ResultsStats';
import { SortOption } from '../../types';

export type ResultsHeaderProps = {
  sortOptions: SortOption[];
} & ResultsStatsProps &
  Omit<SortFilterProps, 'options'>;

export default function ResultsHeader(props: ResultsHeaderProps): JSX.Element {
  const { numberOfResults, query, sortOptions, sortKey, onSort } = props;

  return (
    <Flex container justifyContent="space-between">
      <Flex item>
        <ResultsStats numberOfResults={numberOfResults} query={query} />
      </Flex>
      <Flex item>
        <SortFilter options={sortOptions} sortKey={sortKey} onSort={onSort} />
      </Flex>
    </Flex>
  );
}
