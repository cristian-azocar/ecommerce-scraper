import { forwardRef, MouseEventHandler, ReactNode, Ref } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'reset' | 'submit';
  variant?: 'contained' | 'outlined';
}

function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>): JSX.Element {
  const {
    children,
    className,
    color = 'primary',
    disabled = false,
    loading = false,
    onClick,
    size = 'medium',
    type = 'button',
  } = props;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
