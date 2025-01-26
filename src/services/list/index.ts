import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductListBody, QueryParams } from "./types";
import { PRODUCTS_LIST_KEY } from "./constants";
import { API_KEY, baseURL } from "@services/constants";

const useGetProductList = (queryParams: QueryParams): UseQueryResult<ProductListBody, Error> => {
  return useQuery([PRODUCTS_LIST_KEY, queryParams], async () => {
    const {limit, offset, search} = queryParams;
    const response = await fetch(`${baseURL}/${PRODUCTS_LIST_KEY}?search=${search}&limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      }
    });
    const data: UseQueryResult<ProductListBody, Error> = await response.json();
    return data;
  });
};

export {useGetProductList};