import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetDetailsId } from "../useGetDetailsId";
import { PRODUCTS_DETAILS_KEY } from "@services/details/constants";
import { ProductDetailsBody } from "@services/details/types";

export const useGetQueryDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useGetDetailsId();
  const { data } = useQuery({
    queryKey: [PRODUCTS_DETAILS_KEY, { id }],
    queryFn: () =>
      queryClient.getQueryData<ProductDetailsBody>([PRODUCTS_DETAILS_KEY]),
    enabled: false,
  });
  return { product: data };
};
