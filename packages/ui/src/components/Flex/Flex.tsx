import React from 'react';
import clsx from 'clsx';
import { SystemProps } from '../../system';
import './Flex.scss';

type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FlexProps extends React.ComponentPropsWithRef<'div'> {
  autoGrow?: boolean;
  container?: boolean;
  item?: boolean;
  grow?: boolean;
  direction?: SystemProps.FlexDirection;
  justifyContent?: SystemProps.JustifyContent;
  alignItems?: SystemProps.AlignItems;
  spacing?: SystemProps.Spacing;
  xs?: ColumnSize;
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  xl?: ColumnSize;
}

function Flex(props: FlexProps, ref: React.Ref<HTMLDivElement>): JSX.Element {
  const {
    autoGrow,
    children,
    className,
    container,
    direction,
    justifyContent,
    alignItems,
    item,
    grow,
    spacing,
    xs,
    sm,
    md,
    lg,
    xl,
    ...rest
  } = props;
  const classes: string = clsx(
    {
      'flex-container': container,
      'flex-item': item,
      'flex-auto-grow': autoGrow,
      'flex-grow': grow,
      [`flex-direction-${direction}`]: direction,
      [`flex-justify-${justifyContent}`]: justifyContent,
      [`flex-align-items-${alignItems}`]: alignItems,
      [`flex-spacing-${spacing}`]: spacing,
      [`flex-xs-${xs}`]: xs,
      [`flex-sm-${sm}`]: sm,
      [`flex-md-${md}`]: md,
      [`flex-lg-${lg}`]: lg,
      [`flex-xl-${xl}`]: xl,
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, FlexProps>(Flex);
