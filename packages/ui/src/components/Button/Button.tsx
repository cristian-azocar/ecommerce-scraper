import React, { Ref } from 'react';
import clsx from 'clsx';
import Spinner from '../Spinner';
import './Button.scss';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  as?: React.ElementType;
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'danger';
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'reset' | 'submit';
  variant?: 'solid' | 'outlined' | 'text';
}

function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>): JSX.Element {
  const {
    href,
    as: Component = href ? 'a' : 'button',
    children,
    className,
    fullWidth,
    disabled,
    loading,
    type = 'button',
    color,
    size,
    variant,
    ...rest
  } = props;
  const classes: string = clsx(
    'button',
    {
      [`button-${color}`]: !!color,
      [`button-${size}`]: !!size,
      [`button-${variant}`]: !!variant,
      'button-fullWidth': fullWidth,
    },
    className
  );

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      type={Component === 'button' ? type : undefined}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner className="absolute" />}
      {loading ? <span className="opacity-0">{children}</span> : children}
    </Component>
  );
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
