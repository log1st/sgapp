import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation";
import { z } from "zod";
import qs from "qs";
import { merge, keyBy } from "lodash";
import { DataIndex, getRecordDataIndex, setRecordDataIndex } from "@/utils";

export class SearchParams<Type extends Record<string, unknown>> {
  private params: Type = {} as Type;

  constructor(
    initial?:
      | URLSearchParams
      | SearchParams<Type>
      | ReadonlyURLSearchParams
      | Record<string, unknown>
      | string,
  ) {
    this.params = (
      initial instanceof SearchParams
        ? initial.raw()
        : initial instanceof URLSearchParams ||
          initial instanceof ReadonlyURLSearchParams
        ? qs.parse(initial.toString())
        : typeof initial === "string"
        ? qs.parse(initial)
        : initial
    ) as Type;
  }

  set(key: DataIndex<Type>, value: string | number): this {
    setRecordDataIndex(this.params, key, value);
    return this;
  }

  get<Output>(key: DataIndex<typeof this.params>) {
    return getRecordDataIndex<Output>(this.params, key);
  }

  raw() {
    return this.params;
  }

  merge(
    params?:
      | URLSearchParams
      | ReadonlyURLSearchParams
      | Record<string, unknown>
      | SearchParams<Type>
      | string,
  ): this {
    const newParams = this.clone().raw();

    const convertedParams =
      params instanceof URLSearchParams
        ? qs.parse(params.toString())
        : params instanceof SearchParams
        ? params.raw()
        : (params as Record<string, unknown>);

    this.params = merge(keyBy(newParams), keyBy(convertedParams)) as Type;

    return this;
  }

  validate<NewType>(schema: z.ZodTypeAny): NewType {
    const result = schema.safeParse(this.raw());

    if (result.success) {
      return result.data as NewType;
    }

    return {} as NewType;
  }

  clone(): SearchParams<Type> {
    return new SearchParams<Type>(JSON.parse(JSON.stringify(this.params)));
  }

  toString(): string {
    return qs.stringify(this.raw());
  }
}

export const newSearchParams = <
  Type extends Record<string, unknown> = Record<string, unknown>,
>(
  initial?:
    | URLSearchParams
    | SearchParams<Type>
    | ReadonlyURLSearchParams
    | Record<string, unknown>
    | string,
) => new SearchParams(initial);
