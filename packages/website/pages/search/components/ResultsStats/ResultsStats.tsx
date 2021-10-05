import { Typography } from '@project/ui';

export interface ResultsStatsProps
  extends React.ComponentPropsWithoutRef<'div'> {
  numberOfResults: number;
  query: string;
}

export default function ResultsStats(props: ResultsStatsProps): JSX.Element {
  const { numberOfResults, query, ...rest } = props;

  return (
    <div id="results-stats" {...rest}>
      <Typography>
        {numberOfResults} results found for:{' '}
        <strong>&quot;{query}&quot;</strong>
      </Typography>
    </div>
  );
}
