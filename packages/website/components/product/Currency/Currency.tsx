import { Typography, TypographyProps } from '@project/ui';

export interface CurrencyProps extends TypographyProps {
  value: number;
  prefix?: string;
}

function formatCurrency(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function Currency(props: CurrencyProps): JSX.Element {
  const { value, prefix = '$', ...rest } = props;

  return (
    <Typography {...rest}>
      {prefix}
      {formatCurrency(value)}
    </Typography>
  );
}
