import { arrayFrom, filteredArray } from "./array";

type nullish = false | null | undefined;
type classType = string;

export const classNames = (
  classes:
    | Record<classType, boolean>
    | Array<classType | nullish>
    | classType
    | nullish,
) => {
  const sources: string[] = [];
  if (classes instanceof Array) {
    sources.push(...filteredArray(classes));
  } else if (typeof classes === "object") {
    sources.push(
      ...Object.entries(classes || {})
        .filter(([, v]) => !!v)
        .map(([c]) => c),
    );
  } else if (classes !== false) {
    sources.push(...filteredArray(arrayFrom(classes)));
  }
  return sources.join(" ");
};

export const clsx = classNames;
