export default function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value: T | null) => {
    refs.forEach((ref: React.Ref<T> | undefined) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
