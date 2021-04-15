export default async function asyncForEachParallel<T>(
  array: Array<T>,
  callback: (item: T, index: number) => void
): Promise<void> {
  await Promise.all(array.map(callback));
}
