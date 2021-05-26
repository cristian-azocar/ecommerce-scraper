import React from 'react';
import clsx from 'clsx';
import Spinner from '../Spinner';
import './Button.scss';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  as?: React.ElementType;
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'danger';
  children?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  target?: '_self' | '_blank' | '_parent' | '_top';
  type?: 'button' | 'reset' | 'submit';
  variant?: 'solid' | 'outlined' | 'text';
}

function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
): JSX.Element {
  const {
    href,
    as: Component = href ? 'a' : 'button',
    children,
    className,
    color,
    disabled,
    fullWidth,
    leftIcon,
    loading,
    rightIcon,
    size,
    type = 'button',
    variant = 'outlined',
    ...rest
  } = props;
  const classes: string = clsx(
    'button',
    `button-${variant}`,
    {
      [`button-${color}`]: !!color,
      [`button-${size}`]: !!size,
      'button-full-width': fullWidth,
    },
    className
  );

  // TODO: Add and forward anchor props
  return (
    <Component
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      href={href}
      type={Component === 'button' ? type : undefined}
      aria-busy={loading}
      {...rest}
    >
      {leftIcon && !loading && <span className="button-icon">{leftIcon}</span>}
      {loading && <Spinner className="absolute" />}
      {loading ? <span className="opacity-0">{children}</span> : children}
      {rightIcon && !loading && (
        <span className="button-icon">{rightIcon}</span>
      )}
    </Component>
  );
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
