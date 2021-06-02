import clsx from 'clsx';
import React from 'react';
import { getValidChildren } from '@project/utils';
import { SystemProps } from '../../system';
import './InputGroup.scss';

export interface InputGroupProps extends React.ComponentPropsWithRef<'div'> {
  size?: SystemProps.Size;
}

function InputGroup(
  props: InputGroupProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, size, ...rest } = props;
  const classes = clsx('input-group', className);
  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child: React.ReactElement) => {
    const childProps = { size };
    return React.cloneElement(child, childProps);
  });

  return (
    <div ref={ref} className={classes} {...rest}>
      {clones}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, InputGroupProps>(InputGroup);
