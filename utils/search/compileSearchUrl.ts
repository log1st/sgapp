import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation";
import { newSearchParams, SearchParams } from "./SearchParams";

export const compileSearchUrl = (
  source: string | URL,
  ...searches: Array<
    | URLSearchParams
    | SearchParams
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
    .reduce((a: SearchParams, c) => a.merge(c), newSearchParams(url.search))
    .toString();

  return `${url.pathname}${query ? `?${query}` : ""}`;
};
