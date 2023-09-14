import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation";
import { newSearchParams, SearchParams } from ".";

export const compileSearchUrl = <
  Type extends Record<string, unknown> = Record<string, unknown>,
>(
  source: string | URL,
  ...searches: Array<
    | URLSearchParams
    | SearchParams<Type>
    | ReadonlyURLSearchParams
    | Record<string, unknown>
    | string
  >
) => {
  const url =
    source instanceof URL
      ? source
      : new URL(source.startsWith("/") ? `http://localhost${source}` : source);

  const query = searches
    .reduce(
      (a: SearchParams<Type>, c) => a.merge(c),
      newSearchParams<Type>(url.search),
    )
    .toString();

  return `${url.pathname}${query ? `?${query}` : ""}`;
};
