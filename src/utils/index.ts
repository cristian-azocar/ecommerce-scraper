import parse from 'date-fns/parse';

export function sanitizeNumber(s: string): number {
  return Number(s.replace(/[^0-9]+/g, '')) || 0;
}

export function parseDate(s: string, format: string): Date {
  return parse(s.trim(), format, new Date());
}

export function splitByLineBreaks(s: string): string[] {
  return s
    .trim()
    .replace(/\t/g, '')
    .split(/\r\n|\r|\n/);
}

export async function sleep(millisecondsTimeout: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, millisecondsTimeout));
}

export function sanitizeUrl(url: string): string {
  return url.endsWith('?') ? url.substring(0, url.length - 1) : url;
}
