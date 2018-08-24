export function ifNullOrUndefined(value: any, defaultValue: any) {
  if (value === undefined) {
    return defaultValue;
  }
  if (value === null) {
    return defaultValue;
  }
  return value;
}
