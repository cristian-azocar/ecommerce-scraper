import React from 'react';
import clsx from 'clsx';
import './InputAdornment.scss';

export interface InputAdornmentProps
  extends React.ComponentPropsWithRef<'div'> {
  position?: 'left' | 'right';
}

function InputAdornment(
  props: InputAdornmentProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, position = 'left', ...rest } = props;
  const classes = clsx(
    'input-adornment',
    [`input-adornment-${position}`],
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, InputAdornmentProps>(
  InputAdornment
);
