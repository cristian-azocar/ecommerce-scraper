import React, { Ref } from 'react';
import clsx from 'clsx';
import './Spinner.scss';

export interface SpinnerProps extends React.ComponentPropsWithRef<'div'> {
  size?: number | string;
}

function Spinner(props: SpinnerProps, ref: Ref<HTMLDivElement>): JSX.Element {
  const { className, size = 16, style, ...rest } = props;
  const classes: string = clsx('spinner', className);

  return (
    <div
      className={classes}
      ref={ref}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}

export default React.forwardRef<HTMLDivElement, SpinnerProps>(Spinner);
