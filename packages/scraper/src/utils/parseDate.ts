import parse from 'date-fns/parse';

export default function parseDate(s: string, format: string): Date {
  return parse(s.trim(), format, new Date());
}
