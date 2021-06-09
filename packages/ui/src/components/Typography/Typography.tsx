import clsx from 'clsx';
import React from 'react';
import { SystemProps } from '../../system';
import './Typography.scss';

type BaseProps = React.ComponentPropsWithRef<'p'>;

export interface TypographyProps extends BaseProps {
  as?: React.ElementType;
  variant?: SystemProps.TypographyVariant;
  color?: SystemProps.Color | 'text-primary' | 'text-secondary';
  align?: SystemProps.TextAlign;
  weight?: SystemProps.FontWeight;
}

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
};

function Typography(
  props: TypographyProps,
  ref: React.Ref<HTMLElement>
): JSX.Element {
  const {
    variant = 'body',
    as: Component = variantMapping[variant] || 'p',
    align,
    children,
    color,
    className,
    weight,
    ...rest
  } = props;
  const classes: string = clsx(
    {
      [`typography-${variant}`]: variant,
      [`typography-color-${color}`]: color,
      [`typography-align-${align}`]: align,
      [`typography-weight-${weight}`]: weight,
    },
    className
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default React.forwardRef<HTMLElement, TypographyProps>(Typography);
