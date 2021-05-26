// Helper function to infer the keys of an object and at the same time restrict the value types.
// Useful when don't want to use "Record<K, T>" because the IntelliSense doesn't autocomplete anonymous objects.
const asTypedObject = <E>() => <T>(et: { [K in keyof T]: E }): typeof et => et;

export default asTypedObject;
