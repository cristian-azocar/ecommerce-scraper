import { Typography } from '@project/ui';
import styles from './ResultStats.module.scss';

export interface ResultStatsProps
  extends React.ComponentPropsWithoutRef<'div'> {
  numberOfResults: number;
  query: string;
}

export default function ResultStats(props: ResultStatsProps): JSX.Element {
  const { numberOfResults, query, ...rest } = props;

  return (
    <div className={styles.root} {...rest}>
      <Typography>
        {numberOfResults} results found for:{' '}
        <strong>&quot;{query}&quot;</strong>
      </Typography>
    </div>
  );
}
