import React from 'react';
import clsx from 'clsx';
import './CardImage.scss';

export type CardImageProps = React.ComponentPropsWithRef<'img'>;

function CardImage(
  props: CardImageProps,
  ref: React.Ref<HTMLImageElement>
): JSX.Element {
  const { alt, children, className, ...rest } = props;
  const classes: string = clsx('card-image', className);

  return <img ref={ref} alt={alt} className={classes} {...rest} />;
}

export default React.forwardRef<HTMLImageElement, CardImageProps>(CardImage);
