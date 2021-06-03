export type TextAlign =
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'initial'
  | 'inherit';

export type FontWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type Color =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'info'
  | 'success'
  | 'danger';

export type TypographyVariant =
  | 'body'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonSize = Omit<Size, 'xs' | 'xl'>;

export type ButtonVariant = 'solid' | 'outlined' | 'text';
