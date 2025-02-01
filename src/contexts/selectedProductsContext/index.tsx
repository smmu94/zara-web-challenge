import React, { createContext, useState, useEffect, ReactNode } from "react";
import { SelectedProduct, SelectedProductsContextType } from "./types";

export const SelectedProductsContext =
  createContext<SelectedProductsContextType>({
    selectedProducts: [],
    setSelectedProducts: () => {},
  });

const getInitialProducts = () => {
  if (typeof window === "undefined") {
    return [];
  }
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const SelectedProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProducts, setSelectedProducts] =
    useState<SelectedProduct[]>(getInitialProducts());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts, setSelectedProducts }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};
