const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  let finalObj: Partial<T> = {};
  for (let key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
