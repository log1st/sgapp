/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
export const convertURLSearchParamsToObject = <T>(
  params: URLSearchParams,
): T => {
  const result: T = {} as T;

  params.forEach((value, key) => {
    const keys = key.split(".");
    let currentObject: any = result;

    keys.forEach((keyPart, index) => {
      const isArray =
        index === keys.length - 1 && Array.isArray(currentObject[keyPart]);

      if (isArray) {
        currentObject[keyPart].push(value);
      } else if (index === keys.length - 1) {
        if (currentObject[keyPart] !== undefined) {
          if (!Array.isArray(currentObject[keyPart])) {
            currentObject[keyPart] = [currentObject[keyPart]];
          }
          currentObject[keyPart].push(value);
        } else {
          currentObject[keyPart] = value;
        }
      } else {
        currentObject[keyPart] = currentObject[keyPart] || {};
        currentObject = currentObject[keyPart];
      }
    });
  });

  return result;
};
