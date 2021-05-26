import isArray from './isArray';
import isObject from './isObject';

type WalkObjectPredicate<Leaf = unknown> = (
  value: unknown,
  path: string[]
) => Leaf;

type MappedLeavesObject<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Array<unknown>
    ? MappedLeavesObject<Obj[Prop][number], LeafType>[]
    : Obj[Prop] extends Record<string, unknown>
    ? MappedLeavesObject<Obj[Prop], LeafType>
    : LeafType;
};

export default function walkObject<Target, LeafType>(
  target: Target,
  predicate: WalkObjectPredicate<LeafType>
): MappedLeavesObject<Target, ReturnType<WalkObjectPredicate<LeafType>>> {
  function inner(value: unknown, path: string[] = []): unknown {
    if (isArray(value)) {
      return value.map((item, index) => inner(item, [...path, String(index)]));
    }

    if (isObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, child]) => [
          key,
          inner(child, [...path, key]),
        ])
      );
    }

    return predicate(value, path);
  }

  return inner(target) as MappedLeavesObject<Target, LeafType>;
}
