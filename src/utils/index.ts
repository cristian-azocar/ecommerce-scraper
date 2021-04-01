import parse from 'date-fns/parse';

export function sanitizeNumber(s: string): number {
  return Number(s.replace(/[^0-9]+/g, '')) || 0;
}

export function parseDate(s: string, format: string): Date {
  return parse(s.trim(), format, new Date());
}

export function splitByLineBreaks(s: string): string[] {
  return s.trim().split(/\r\n|\r|\n/);
}
