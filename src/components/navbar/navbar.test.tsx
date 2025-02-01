import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from ".";
import routes from "@utils/routes";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { SelectedProduct } from "@contexts/selectedProductsContext/types";
import { mockProduct } from "@utils/tests/mockProduct";

type ComponentProps = {
  selectedProduct?: SelectedProduct;
};
const Component = ({ selectedProduct }: ComponentProps) => {
  return (
    <SelectedProductsContext.Provider
      value={{
        selectedProducts: selectedProduct ? [selectedProduct] : [],
        setSelectedProducts: jest.fn(),
      }}
    >
      <Navbar />
    </SelectedProductsContext.Provider>
  );
};

describe("Navbar", () => {
  it("Navbar: should render the navbar with the correct links", () => {
    render(<Component />);
    const logo = screen.getAllByRole("img")[0];
    expect(logo).toHaveAttribute("alt", "logo");
    expect(logo.closest("a")).toHaveAttribute("href", routes.home.main);
    const cart = screen.getAllByRole("img")[1];
    expect(cart).toHaveAttribute("alt", "bag");
    expect(cart.closest("a")).toHaveAttribute("href", routes.cart.main);
  });
  it("Navbar: should render the navbar with the correct number of selected products", () => {
    render(<Component selectedProduct={mockProduct} />);
    const cart = screen.getAllByRole("img")[1];
    expect(cart).toHaveAttribute("alt", "bag_solid");
  });
});
