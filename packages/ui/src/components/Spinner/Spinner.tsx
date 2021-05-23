import React, { Ref } from 'react';
import clsx from 'clsx';
import './Spinner.scss';

export type SpinnerProps = React.ComponentPropsWithRef<'div'>;

function Spinner(props: SpinnerProps, ref: Ref<HTMLDivElement>): JSX.Element {
  const { className, ...rest } = props;
  const classes: string = clsx(className, 'spinner');

  return <div className={classes} ref={ref} {...rest} />;
}

export default React.forwardRef<HTMLDivElement, SpinnerProps>(Spinner);
