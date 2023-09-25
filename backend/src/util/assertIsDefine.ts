export function assertIsDefine<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw new Error("Expected 'val' to be defined, but received " + val);
  }
}
