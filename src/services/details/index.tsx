import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { API_KEY, baseURL } from "@services/constants";
import { ProductDetailsBody } from "./types";
import { PRODUCTS_DETAILS_KEY } from "./constants";
import { PRODUCTS_LIST_KEY } from "@services/list/constants";

export const useGetProductDetails = (
  id: number,
  options?: UseQueryOptions<ProductDetailsBody, unknown, ProductDetailsBody, [string, { id: string }]>,
): UseQueryResult<ProductDetailsBody, unknown> => {
  return useQuery(
    [PRODUCTS_DETAILS_KEY, { id: id.toString() }],
    async () => {
      const response = await fetch(
        `${baseURL}/${PRODUCTS_LIST_KEY}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );
      const data: ProductDetailsBody = await response.json();
      return data;
    },
    options
  );
};