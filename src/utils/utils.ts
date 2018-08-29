export function ifNullOrUndefined(value: any, defaultValue: any) {
  if (value === undefined) {
    return defaultValue;
  }
  if (value === null) {
    return defaultValue;
  }
  return value;
}

export function padEnd(string?: string, length?: number, chars?: string) {
  chars = chars || " ";
  string = string || "";
  length = length || string.length;

  if (string.length < length) {
    for (let i = string.length; i < length; i += chars.length) {
      string += chars;
    }
  }

  return string.substr(0, length);
}

export function padStart(string?: string, length?: number, chars?: string) {
  chars = chars || " ";
  string = string || "";
  length = length || string.length;

  let addStr = "";
  if (string.length < length) {
    for (let i = string.length; i < length; i += chars.length) {
      addStr += chars;
    }
  } else {
    string = string.substr(0, length);
  }

  return addStr.substr(0, length - string.length) + string;
}
