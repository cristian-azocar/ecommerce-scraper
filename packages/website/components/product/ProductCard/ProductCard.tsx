import clsx from 'clsx';
import { Card, CardProps, Flex, Link, Typography } from '@project/ui';
import { Product } from '@project/database';
import { AvailabilityEnum } from '@project/database/src/enums'; // TODO: please fix this import
import Currency from '../Currency';
import ProductBadge from '../ProductBadge';
import styles from './ProductCard.module.scss';

export interface ProductCardProps extends CardProps {
  product: Product;
}

const availabilities: Record<number, string> = {
  [AvailabilityEnum.OutOfStock]: 'Out of stock',
  [AvailabilityEnum.Presale]: 'Presale',
  [AvailabilityEnum.UpcomingRelease]: 'Upcoming release',
};

export default function ProductCard(props: ProductCardProps): JSX.Element {
  const { product, className, ...rest } = props;
  const outOfStock = product.availabilityId === AvailabilityEnum.OutOfStock;
  const badge = createBadge();
  const classes = clsx(
    [styles.root],
    { [styles['out-of-stock']]: outOfStock },
    className
  );

  function createBadge(): JSX.Element | null {
    const label = availabilities[product.availabilityId || 0];

    if (label) {
      return <ProductBadge>{label}</ProductBadge>;
    }

    return null;
  }

  return (
    <Card className={classes} {...rest}>
      <Card.Content direction="column" className="text-center">
        <Flex
          container
          item
          justifyContent="center"
          alignItems="center"
          className={styles['image-container']}
        >
          <Link href={product.url} external>
            {badge}
            <img src={product.imageUrl} alt={product.name} />
          </Link>
        </Flex>
        <Flex
          container
          item
          justifyContent="center"
          className={styles['product-name-container']}
        >
          <Flex item>
            <Typography>{product.name}</Typography>
          </Flex>
        </Flex>
        <Flex item>
          <Currency value={product.price} weight="semibold" />
        </Flex>
      </Card.Content>
    </Card>
  );
}
