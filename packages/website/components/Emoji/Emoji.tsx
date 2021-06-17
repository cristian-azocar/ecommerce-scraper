import React from 'react';

export interface EmojiProps extends React.ComponentPropsWithoutRef<'span'> {
  label?: string;
}

export default function Emoji(props: EmojiProps): JSX.Element {
  const { children, label, ...rest } = props;

  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label || undefined}
      role="img"
      {...rest}
    >
      {children}
    </span>
  );
}
