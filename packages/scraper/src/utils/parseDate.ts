import isMatch from 'date-fns/isMatch';
import parse from 'date-fns/parse';

export interface ParseDateResult {
  isValid: boolean;
  date?: Date;
}

export default function parseDate(
  value: string | undefined,
  format: string
): ParseDateResult {
  if (!value || !isMatch(value, format)) {
    return { isValid: false };
  }

  return {
    isValid: true,
    date: parse(value, format, new Date()),
  };
}
