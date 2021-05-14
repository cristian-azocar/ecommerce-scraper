import { forwardRef, MouseEventHandler, ReactNode, Ref } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import theme from '../../system/theme';

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'reset' | 'submit';
  variant?: 'solid' | 'outlined' | 'text';
}

const StyledButton = styled.button`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  width: auto;
  line-height: 1.2;
  padding: 0px;
  box-sizing: border-box;
  border-width: 0px;
  cursor: pointer;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.shape.borderRadius}px;
  padding-inline-start: ${theme.spacing(4)};
  padding-inline-end: ${theme.spacing(4)};
  height: ${theme.spacing(8)};

  &:hover {
    background: ${darken(0.2, theme.colors.primary)};
  }
`;

function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>): JSX.Element {
  const {
    children,
    className,
    color = 'primary',
    disabled = false,
    fullWidth = false,
    href,
    loading = false,
    onClick,
    size = 'medium',
    type = 'button',
    variant = 'solid',
  } = props;

  return (
    <StyledButton
      // as={href ? 'a' : 'button'}
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
