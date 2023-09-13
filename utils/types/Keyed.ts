import { Key } from "react";

export type Keyed<Type> = Type & {
  key: Key;
};
