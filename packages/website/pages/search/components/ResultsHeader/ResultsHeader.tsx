import { Flex } from '@project/ui';
import SortFilter from '../SortFilter';
import ResultStats from '../ResultStats';
import { SortOption } from '../../types';

export interface ResultsHeaderProps {
  numberOfResults: number;
  query: string;
  sortOptions: SortOption[];
  sortKey: string;
  onSort: (value: string) => void;
}

export default function ResultsHeader(props: ResultsHeaderProps): JSX.Element {
  const { numberOfResults, query, sortOptions, sortKey, onSort } = props;

  return (
    <Flex container justifyContent="space-between">
      <Flex item>
        <ResultStats numberOfResults={numberOfResults} query={query} />
      </Flex>
      <Flex item>
        <SortFilter options={sortOptions} sortKey={sortKey} onSort={onSort} />
      </Flex>
    </Flex>
  );
}
