import { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'reset' | 'submit';
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, className, disabled, onClick, type } = props;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
