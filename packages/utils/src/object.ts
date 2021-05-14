import { AnyObject } from './types';

export function areEqual(object: AnyObject, other: AnyObject): boolean {
  const objectKeys: string[] = Object.keys(object);
  const otherKeys: string[] = Object.keys(other);

  if (objectKeys.length !== otherKeys.length) {
    return false;
  }

  return objectKeys.every((key: string) => {
    if (typeof object[key] === 'object') {
      return areEqual(object[key] as AnyObject, other[key] as AnyObject);
    }

    return object[key] === other[key];
  });
}

export function get(
  object: object, // eslint-disable-line @typescript-eslint/ban-types
  path: string | number,
  defaultValue?: unknown
): unknown {
  const key = typeof path === 'string' ? path.split('.') : [path];

  for (let index = 0; index < key.length; index++) {
    if (!object) break;
    // eslint-disable-next-line no-param-reassign
    object = object[key[index] as keyof typeof object] as typeof object;
  }

  return object === undefined ? defaultValue : object;
}
