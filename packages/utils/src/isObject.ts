import isArray from './isArray';

export default function isObject<T>(
  value: unknown
): value is Record<string, T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    !isArray(value)
  );
}
