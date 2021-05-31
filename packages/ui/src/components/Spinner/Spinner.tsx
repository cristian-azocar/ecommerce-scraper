import React, { Ref } from 'react';
import clsx from 'clsx';
import { SystemProps } from '../../system';
import './Spinner.scss';

export interface SpinnerProps extends React.ComponentPropsWithRef<'div'> {
  color?: SystemProps.Color;
  size?: SystemProps.Size;
}

function Spinner(props: SpinnerProps, ref: Ref<HTMLDivElement>): JSX.Element {
  const { className, color, size, ...rest } = props;
  const classes: string = clsx(
    'spinner',
    {
      [`spinner-color-${color}`]: color,
      [`spinner-${size}`]: size,
    },
    className
  );

  return <div className={classes} ref={ref} {...rest} />;
}

export default React.forwardRef<HTMLDivElement, SpinnerProps>(Spinner);
