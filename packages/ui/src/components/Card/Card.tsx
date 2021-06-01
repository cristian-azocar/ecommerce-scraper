import React from 'react';
import clsx from 'clsx';
import './Card.scss';

export type CardProps = React.ComponentPropsWithRef<'div'>;

function Card(props: CardProps, ref: React.Ref<HTMLDivElement>): JSX.Element {
  const { children, className, ...rest } = props;
  const classes: string = clsx('card', className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, CardProps>(Card);
