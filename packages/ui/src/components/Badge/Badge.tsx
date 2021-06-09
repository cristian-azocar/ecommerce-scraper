import React from 'react';
import clsx from 'clsx';
import { SystemProps } from '../../system';
import './Badge.scss';

export interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  color?: SystemProps.Color;
  size?: SystemProps.Size;
}

function Badge(
  props: BadgeProps,
  ref: React.Ref<HTMLSpanElement>
): JSX.Element {
  const { children, className, color, size, ...rest } = props;
  const classes = clsx(
    'badge',
    {
      [`badge-${color}`]: color,
      [`badge-${size}`]: size,
    },
    className
  );

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
}

export default React.forwardRef<HTMLSpanElement, BadgeProps>(Badge);
