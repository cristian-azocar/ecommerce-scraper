import clsx from 'clsx';
import React from 'react';
import Typography, { TypographyProps } from '../Typography';
import './Link.scss';

type BaseProps = TypographyProps & React.ComponentPropsWithRef<'a'>;

export interface LinkProps extends BaseProps {
  external?: boolean;
}

function Link(
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement>
): JSX.Element {
  const { children, className, external, rel, target, ...rest } = props;
  const classes = clsx('link', className);
  const anchorProps = {
    rel: rel || (external ? 'noopener noreferrer' : undefined),
    target: target || (external ? '_blank' : undefined),
  };

  return (
    <Typography ref={ref} as="a" className={classes} {...anchorProps} {...rest}>
      {children}
    </Typography>
  );
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>(Link);
