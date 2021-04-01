export function sanitizeNumber(s: string): number {
  return Number(s.replace(/[^0-9]+/g, '')) || 0;
}
