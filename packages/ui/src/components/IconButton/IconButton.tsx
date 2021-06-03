import clsx from 'clsx';
import React from 'react';
import { SystemProps } from '../../system';
import Button from '../Button';
import './IconButton.scss';

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  color?: SystemProps.Color;
  size?: SystemProps.ButtonSize;
}

function IconButton(
  props: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
): JSX.Element {
  const { children, className, size, ...rest } = props;
  const classes = clsx(
    'icon-button',
    {
      [`icon-button-${size}`]: size,
    },
    className
  );

  return (
    <Button ref={ref} variant="text" size={size} className={classes} {...rest}>
      {children}
    </Button>
  );
}

export default React.forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);
