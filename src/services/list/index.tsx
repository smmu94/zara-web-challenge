import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ProductListBody, QueryParams } from "./types";
import { PRODUCTS_LIST_KEY } from "./constants";
import { API_KEY, baseURL } from "@services/constants";

export const useGetProductList = (
  queryParams: QueryParams,
  options?: UseQueryOptions<
    ProductListBody,
    unknown,
    ProductListBody,
    [string, QueryParams]
  >
): UseQueryResult<ProductListBody> => {
  return useQuery(
    [PRODUCTS_LIST_KEY, queryParams],
    async () => {
      const params = new URLSearchParams(
        Object.entries(queryParams)
          .filter(([, value]) => value)
          .map(([key, value]) => [key, value.toString()])
      );
      const response = await fetch(
        `${baseURL}/${PRODUCTS_LIST_KEY}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );
      return response.json();
    },
    { ...options, refetchOnWindowFocus: false }
  );
};
