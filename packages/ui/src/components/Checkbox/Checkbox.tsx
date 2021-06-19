import React from 'react';
import clsx from 'clsx';
import { SystemProps } from '../../system';
import './Checkbox.scss';

export interface CheckboxProps extends React.ComponentPropsWithRef<'label'> {
  inputProps?: React.ComponentPropsWithRef<'input'>;
  size?: SystemProps.Size;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
}

function Checkbox(
  props: CheckboxProps,
  ref: React.Ref<HTMLLabelElement>
): JSX.Element {
  const { children, className, size, inputProps, id, value, ...rest } = props;
  const labelClasses = clsx(
    'checkbox',
    { [`checkbox-${size}`]: size },
    className
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label ref={ref} className={labelClasses} {...rest}>
      <input
        type="checkbox"
        className="checkbox-input"
        value={value}
        id={id}
        {...inputProps}
      />
      <span className="checkbox-label">{children}</span>
    </label>
  );
}

export default React.forwardRef<HTMLLabelElement, CheckboxProps>(Checkbox);
