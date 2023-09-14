import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { newSearchParams } from ".";

export const useClientSearch = <
  Type extends z.ZodRawShape,
  Schema extends z.ZodObject<Type>,
>(
  schema: Schema,
) => {
  const params = useSearchParams();

  return newSearchParams<Type>(params).validate<z.infer<Schema>>(schema);
};
