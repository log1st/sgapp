import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { set } from "lodash";
import { ListingRequest, ListingResponse } from "@/api";
import { ApiResponse } from "@/api/client";
import { arrayFrom, DataIndex } from "@/utils";

export type SelectFetch<Payload extends Record<string, unknown>, Entity> = (
  request: ListingRequest<Payload>,
) => Promise<ApiResponse<ListingResponse<Entity>>>;

export type UseSelectOptions = {
  skip?: boolean;
};

export const useSelect = <Payload extends Record<string, unknown>, Entity>(
  fetch: SelectFetch<Payload, Entity>,
  field?: DataIndex<Payload>,
  { skip = false }: UseSelectOptions = {},
) => {
  const [query, onQueryChange] = useState(field ? "" : undefined);

  const [loading, setLoading] = useToggle(false);

  const [page, onPageChange] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [options, setOptions] = useState<Array<Entity>>([]);

  useEffect(() => {
    if (!query) {
      return;
    }
    onPageChange(1);
  }, [query, onPageChange]);

  useEffect(() => {
    if (skip) {
      return () => {};
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const request = {
        page,
      };
      if (field) {
        set(request, arrayFrom(field), query);
      }

      const response = await fetch(request as ListingRequest<Payload>);
      setLoading(false);

      if (!response.success) {
        return;
      }

      setOptions(response.data.data);
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
