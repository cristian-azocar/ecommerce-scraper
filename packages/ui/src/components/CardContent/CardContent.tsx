import clsx from 'clsx';
import React from 'react';
import './CardContent.scss';

export type CardContentProps = React.ComponentPropsWithRef<'div'>;

function CardContent(
  props: CardContentProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, ...rest } = props;
  const classes: string = clsx('card-content', className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, CardContentProps>(CardContent);
