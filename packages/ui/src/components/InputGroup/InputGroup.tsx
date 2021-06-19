import clsx from 'clsx';
import React from 'react';
import './InputGroup.scss';

export type InputGroupProps = React.ComponentPropsWithRef<'div'>;

function InputGroup(
  props: InputGroupProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, ...rest } = props;
  const classes = clsx('input-group', className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, InputGroupProps>(InputGroup);
