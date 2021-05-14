export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isObject<T>(value: unknown): value is Record<string, T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    !isArray(value)
  );
}
