import React, { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, onClick } = props;

  return <button onClick={onClick}>{children}</button>;
}
