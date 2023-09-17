import { useEffect, useRef, useState } from "react";
import { useToggle } from "react-use";
import { ListingRequest, ListingResponse } from "@/api";
import { ApiResponse } from "@/api/client";

export type SelectFetch<Payload extends Record<string, unknown>, Entity> = (
  request: ListingRequest<Payload>,
) => Promise<ApiResponse<ListingResponse<Entity>>>;

export type UseSelectOptions = {
  skip?: boolean;
};

export const useSelect = <Payload extends Record<string, unknown>, Entity>(
  fetch: SelectFetch<Payload, Entity>,
  field?: keyof Payload,
  { skip = false }: UseSelectOptions = {},
) => {
  const [query, onQueryChange] = useState(field ? "" : undefined);

  useEffect(() => {
    onQueryChange(field ? "" : undefined);
  }, [field]);

  const pages = useRef(new Map<number, Array<Entity>>());

  const [loading, setLoading] = useToggle(false);

  const [page, onPageChange] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const options = Array.from(pages.current.entries())
    .toSorted((a, b) => (a[0] > b[0] ? 1 : -1))
    .reduce((a, [, c]) => [...a, ...c], [] as Array<Entity>);

  useEffect(() => {
    if (!query) {
      return;
    }
    onPageChange(1);
    pages.current = new Map();
  }, [query, onPageChange]);

  useEffect(() => {
    if (skip) {
      return () => {};
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const response = await fetch({
        page,
        ...(field ? { [field]: query } : {}),
      } as ListingRequest<Payload>);
      setLoading(false);

      if (!response.success) {
        return;
      }

      pages.current.set(page, response.data.data);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, page, fetch, skip]);

  return {
    query,
    onQueryChange,
    options,
    page,
    onPageChange,
    loading,
    totalPages,
  };
};
