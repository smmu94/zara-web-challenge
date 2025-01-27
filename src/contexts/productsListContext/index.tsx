import React, { createContext, useState } from "react";
import { ProductsListContextType } from "./types";
import { ProductListBody } from "@services/list/types";

export const ProductsListContext = createContext<ProductsListContextType>({
  productsList: [],
  setProductsList: () => {},
  search: "",
  setSearch: () => {},
});

export const ProductsListProvider: React.FC = ({ children }) => {
  const [productsList, setProductsList] = useState<ProductListBody>([]);
  const [search, setSearch] = useState("");

  return (
    <ProductsListContext.Provider
      value={{ productsList, setProductsList, search, setSearch }}
    >
      {children}
    </ProductsListContext.Provider>
  );
};
