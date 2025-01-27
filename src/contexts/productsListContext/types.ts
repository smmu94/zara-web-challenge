import { ProductListBody, QueryParams } from "@services/list/types";

export type ProductsListContextType = {
    productsList: ProductListBody;
    setProductsList: React.Dispatch<React.SetStateAction<ProductListBody>>;
    search: QueryParams["search"];
    setSearch: React.Dispatch<React.SetStateAction<QueryParams["search"]>>;
    };