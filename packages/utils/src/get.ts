/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-param-reassign */
export default function get(
  object: object,
  path: string | number,
  defaultValue?: unknown
): unknown {
  const key = typeof path === 'string' ? path.split('.') : [path];

  for (let index = 0; index < key.length; index++) {
    if (!object) break;
    object = object[key[index] as keyof typeof object] as typeof object;
  }

  return object === undefined ? defaultValue : object;
}
