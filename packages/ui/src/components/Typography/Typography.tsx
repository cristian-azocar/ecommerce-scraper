import clsx from 'clsx';
import React from 'react';
import { SystemProps } from '../../system';
import './Typography.scss';

type BaseProps = React.ComponentPropsWithRef<'p'>;

export interface TypographyProps extends BaseProps {
  as?: React.ElementType;
  variant?: SystemProps.TypographyVariant;
  color?: SystemProps.Color;
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
    as,
    align,
    children,
    color,
    className,
    weight,
    variant = 'body',
    ...rest
  } = props;
  const Component = as || variantMapping[variant] || 'p';
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
