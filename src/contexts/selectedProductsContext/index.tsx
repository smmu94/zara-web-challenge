import React, { createContext, useState } from "react";
import { SelectedProduct, SelectedProductsContextType } from "./types";

export const SelectedProductsContext =
  createContext<SelectedProductsContextType>({
    selectedProducts: [],
    setSelectedProducts: () => {},
  });

export const SelectedProductsProvider: React.FC = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts, setSelectedProducts }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};
