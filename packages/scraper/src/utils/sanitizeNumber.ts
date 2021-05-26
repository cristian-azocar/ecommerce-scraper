export default function sanitizeNumber(s?: string): number {
  if (s === null) {
    return 0;
  }

  if (s === undefined) {
    return NaN;
  }

  return Number(s.replace(/[^0-9]+/g, '')) || 0;
}
