import React from 'react';
import clsx from 'clsx';
import './Input.scss';
import { SystemProps } from '../../system';

type BaseProps = Omit<React.ComponentPropsWithRef<'input'>, 'size'>;

export interface InputProps extends BaseProps {
  size?: SystemProps.Size;
  isInvalid?: boolean;
  leftElement?: React.ReactNode;
}

function Input(
  props: InputProps,
  ref: React.Ref<HTMLInputElement>
): JSX.Element {
  const { className, size, isInvalid, leftElement, ...rest } = props;
  const classes: string = clsx('input', { [`input-${size}`]: size }, className);

  return (
    <input ref={ref} className={classes} aria-invalid={isInvalid} {...rest} />
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
