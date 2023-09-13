import { z } from "zod";
import { newSearchParams } from "./SearchParams";
import { getServerUrl } from "@/session/getServerUrl";

export const getSearchParams = () => new URLSearchParams(getServerUrl().search);

export const getServerSearch = <
  Type extends z.ZodRawShape,
  Schema extends z.ZodObject<Type>,
>(
  schema: Schema,
) => newSearchParams(getSearchParams()).validate<z.infer<Schema>>(schema);
