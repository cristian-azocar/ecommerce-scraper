import clsx from 'clsx';
import React from 'react';
import './CardImage.scss';

export type CardImageProps = React.ComponentPropsWithRef<'div'>;

function CardImage(
  props: CardImageProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, ...rest } = props;
  const classes: string = clsx('card-image', className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, CardImageProps>(CardImage);
