import React from "react";
import { CartItemProps } from "./types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { render, screen } from "@testing-library/react";
import CartItem from ".";
import { mockProduct } from "@utils/tests/mockProduct";
import userEvent from "@testing-library/user-event";

const mockSetSelectedProducts = jest.fn((callback) => {
  callback([{ ...mockProduct, id: "123" }]);
});

const Component = ({ product }: { product: CartItemProps }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SelectedProductsContext.Provider
        value={{
          selectedProducts: [product],
          setSelectedProducts: mockSetSelectedProducts,
        }}
      >
        <CartItem {...product} />
      </SelectedProductsContext.Provider>
    </QueryClientProvider>
  );
};

describe("CartView - CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("CartItem: render default", () => {
    render(<Component product={mockProduct} />);
    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProduct.storage.capacity} | ${mockProduct.color.name.toUpperCase()}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProduct.storage.price} EUR`)
    ).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
  it("should delete product when 'Eliminar' button is clicked", () => {
    render(<Component product={{ ...mockProduct, id: "123" }} />);
    expect(
      screen.getByText(mockProduct.name.toUpperCase())
    ).toBeInTheDocument();
    const button = screen.getByText("Eliminar");
    userEvent.click(button);
    expect(mockSetSelectedProducts).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedProducts).toHaveBeenCalledWith(expect.any(Function));
  });
});
