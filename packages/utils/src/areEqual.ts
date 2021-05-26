import { AnyObject } from './types';

export default function areEqual(object: AnyObject, other: AnyObject): boolean {
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
