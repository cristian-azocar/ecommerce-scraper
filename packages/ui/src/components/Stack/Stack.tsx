import clsx from 'clsx';
import React from 'react';
import './Stack.scss';

export interface StackProps extends React.ComponentPropsWithRef<'div'> {
  direction?: 'row' | 'column';
}

function Stack(props: StackProps, ref: React.Ref<HTMLDivElement>): JSX.Element {
  const { children, className, direction = 'row', ...rest } = props;
  const classes = clsx('stack', `stack-${direction}`, className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, StackProps>(Stack);
