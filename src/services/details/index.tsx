import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ProductDetailsBody } from "./types";
import { PRODUCTS_DETAILS_KEY } from "./constants";
import { PRODUCTS_LIST_KEY } from "@services/list/constants";
import { API_KEY, baseURL } from "@services/constants";

export const useGetProductDetails = (
  id: string,
  options?: UseQueryOptions<
    ProductDetailsBody,
    unknown,
    ProductDetailsBody,
    [string, { id: string }]
  >
): UseQueryResult<ProductDetailsBody> => {
  return useQuery(
    [PRODUCTS_DETAILS_KEY, { id }],
    async () => {
      const response = await fetch(`${baseURL}/${PRODUCTS_LIST_KEY}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });
      return response.json();
    },
    { ...options, refetchOnWindowFocus: false }
  );
};
