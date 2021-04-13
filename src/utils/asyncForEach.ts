/* eslint-disable no-await-in-loop */
export default async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}
