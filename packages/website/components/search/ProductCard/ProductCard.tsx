import clsx from 'clsx';
import { Card, Flex, Link, Typography } from '@project/ui';
import Currency from '../../Currency';
import ProductBadge from '../ProductBadge';
import { EnhancedProduct } from '../../../types';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: EnhancedProduct;
}

export default function ProductCard(props: ProductCardProps): JSX.Element {
  const { product } = props;
  const classes = clsx([styles.root], {
    [styles.unavailable]: product.isUnavailable,
  });

  return (
    <Card className={classes}>
      <Card.Content direction="column" className="text-center">
        <Flex
          container
          item
          justifyContent="center"
          alignItems="center"
          className={styles['image-container']}
        >
          <Link href={product.url} external>
            {product.isUnavailable && (
              <ProductBadge>{product.availability?.name}</ProductBadge>
            )}
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
