import React, { Ref } from 'react';
import clsx from 'clsx';
import './Spinner.scss';
import { SystemProps } from '../../system';

export interface SpinnerProps extends React.ComponentPropsWithRef<'div'> {
  size?: SystemProps.Size;
  color?: SystemProps.Color;
}

function Spinner(props: SpinnerProps, ref: Ref<HTMLDivElement>): JSX.Element {
  const { className, color, size = 'md', ...rest } = props;
  const classes: string = clsx(
    'spinner',
    `spinner-${size}`,
    {
      [`spinner-color-${color}`]: color,
    },
    className
  );

  return <div className={classes} ref={ref} {...rest} />;
}

export default React.forwardRef<HTMLDivElement, SpinnerProps>(Spinner);
