import React from 'react';
import clsx from 'clsx';
import { SystemProps } from '../../system';
import './Header.scss';

export interface HeaderProps extends React.ComponentPropsWithRef<'header'> {
  position?: SystemProps.Position;
}

function Header(
  props: HeaderProps,
  ref: React.Ref<HTMLHeadElement>
): JSX.Element {
  const { children, className, position, ...rest } = props;
  const classes = clsx(
    'header',
    { [`header-${position}`]: position },
    className
  );

  return (
    <header ref={ref} className={classes} {...rest}>
      <div className="header-content">{children}</div>
    </header>
  );
}

export default React.forwardRef<HTMLHeadElement, HeaderProps>(Header);
