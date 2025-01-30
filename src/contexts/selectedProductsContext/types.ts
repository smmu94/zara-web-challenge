import { FormData } from "@modules/details/components/productInfo/form";
import { ProductDetailsBody } from "@services/details/types";

export type SelectedProduct = FormData & {
    id: ProductDetailsBody["id"];
    name: ProductDetailsBody["name"];
};

export type SelectedProductsContextType = {
    selectedProducts: SelectedProduct[];
    setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
};