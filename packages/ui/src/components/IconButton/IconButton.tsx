import clsx from 'clsx';
import React from 'react';
import Button, { ButtonProps } from '../Button';
import './IconButton.scss';

type BaseProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon'>;

export interface IconButtonProps extends BaseProps {
  rounded?: boolean;
}

function IconButton(
  props: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
): JSX.Element {
  const {
    children,
    className,
    rounded,
    size,
    variant = 'text',
    ...rest
  } = props;
  const classes = clsx(
    'icon-button',
    {
      [`icon-button-${size}`]: size,
      'icon-button-rounded': rounded,
    },
    className
  );

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={classes}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default React.forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);
