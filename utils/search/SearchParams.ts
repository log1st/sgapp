import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation";
import { z } from "zod";
import { convertURLSearchParamsToObject } from "./convertURLSearchParamsToObject";
import { convertObjectToURLSearchParams } from "./convertObjectToURLSearchParams";

export class SearchParams {
  private params: URLSearchParams = new URLSearchParams();

  constructor(
    initial?:
      | URLSearchParams
      | SearchParams
      | ReadonlyURLSearchParams
      | Record<string, unknown>
      | string,
  ) {
    this.params = new URLSearchParams(
      initial instanceof SearchParams
        ? initial.asIs()
        : (initial as Record<string, string>),
    );
  }

  set(key: string, value: string | number): this {
    this.params.set(key, String(value));
    return this;
  }

  get(key: string): string | null {
    return this.params.get(key);
  }

  asIs(): URLSearchParams {
    return this.params;
  }

  raw<Type>(): Type {
    return convertURLSearchParamsToObject(this.asIs());
  }

  merge(
    params?:
      | URLSearchParams
      | ReadonlyURLSearchParams
      | Record<string, unknown>
      | SearchParams
      | string,
  ): this {
    const newParams = new URLSearchParams(this.params);
    const convertedParams =
      params instanceof URLSearchParams
        ? params
        : params instanceof SearchParams
        ? params.asIs()
        : convertObjectToURLSearchParams(params as Record<string, unknown>);

    convertedParams.forEach((value, key) => {
      newParams.append(key, value);
    });

    this.params = newParams;

    return this;
  }

  validate<Type>(schema: z.ZodTypeAny): Type {
    const result = schema.safeParse(this.raw());

    if (result.success) {
      return result.data as Type;
    }

    return {} as Type;
  }

  clone(): SearchParams {
    return new SearchParams(this.asIs());
  }

  toString(): string {
    return this.params.toString();
  }
}

export const newSearchParams = (
  initial?:
    | URLSearchParams
    | SearchParams
    | ReadonlyURLSearchParams
    | Record<string, unknown>
    | string,
) => new SearchParams(initial);
