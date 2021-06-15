import React from 'react';
import clsx from 'clsx';
import Flex, { FlexProps } from '../Flex';
import './CardContent.scss';

export type CardContentProps = FlexProps;

function CardContent(
  props: CardContentProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const { children, className, ...rest } = props;
  const classes: string = clsx('card-content', className);

  return (
    <Flex ref={ref} className={classes} container {...rest}>
      {children}
    </Flex>
  );
}

export default React.forwardRef<HTMLDivElement, CardContentProps>(CardContent);
