import { Typography } from '@project/ui';
import styles from './ProductBadge.module.scss';

export type ProductBadgeProps = React.ComponentPropsWithoutRef<'div'>;

export default function ProductBadge(props: ProductBadgeProps): JSX.Element {
  const { children } = props;

  return (
    <div className={styles.root}>
      <Typography weight="semibold">{children}</Typography>
    </div>
  );
}
