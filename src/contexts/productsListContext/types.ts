import { Dispatch, SetStateAction } from "react";
import { ProductListBody, QueryParams } from "@services/list/types";

export type ProductsListContextType = {
    productsList: ProductListBody;
    setProductsList: Dispatch<SetStateAction<ProductListBody>>;
    search: QueryParams["search"];
    setSearch: Dispatch<SetStateAction<QueryParams["search"]>>;
    };