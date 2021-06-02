import React from 'react';
import clsx from 'clsx';
import './InputAddon.scss';

export interface InputAddonProps extends React.ComponentPropsWithRef<'div'> {
  position?: 'left' | 'right';
}

function InputAddon(
  props: InputAddonProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, position = 'left', ...rest } = props;
  const classes = clsx('input-addon', [`input-addon-${position}`], className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, InputAddonProps>(InputAddon);
