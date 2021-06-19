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
  alignContent?: SystemProps.AlignContent;
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
    alignContent,
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
      'flex-auto-grow': container && autoGrow,
      'flex-grow': item && grow,
      [`flex-align-content-${alignContent}`]: container && alignContent,
      [`flex-direction-${direction}`]: container && direction,
      [`flex-justify-${justifyContent}`]: container && justifyContent,
      [`flex-align-items-${alignItems}`]: container && alignItems,
      [`flex-spacing-${spacing}`]: container && spacing,
      [`flex-xs-${xs}`]: item && xs,
      [`flex-sm-${sm}`]: item && sm,
      [`flex-md-${md}`]: item && md,
      [`flex-lg-${lg}`]: item && lg,
      [`flex-xl-${xl}`]: item && xl,
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
