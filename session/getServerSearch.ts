import { z } from "zod";
import { getServerUrl } from "@/session/getServerUrl";
import { newSearchParams } from "@/utils";

export const getSearchParams = () => new URLSearchParams(getServerUrl().search);

export const getServerSearch = <
  Type extends z.ZodRawShape,
  Schema extends z.ZodObject<Type>,
>(
  schema: Schema,
) => newSearchParams(getSearchParams()).validate<z.infer<Schema>>(schema);
