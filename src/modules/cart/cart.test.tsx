import React from "react";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CartView from ".";
import { render, screen } from "@testing-library/react";
import { SelectedProduct } from "@contexts/selectedProductsContext/types";
import { mockProduct } from "../../utils/tests/mockProduct";

const mockSelectedProducts: SelectedProduct[] = Array.from(
  { length: 5 },
  (_, index) => ({
    ...mockProduct,
    id: `product-${index}`,
  })
);

const Component = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SelectedProductsContext.Provider
        value={{
          selectedProducts: mockSelectedProducts,
          setSelectedProducts: jest.fn(),
        }}
      >
        <CartView />
      </SelectedProductsContext.Provider>
    </QueryClientProvider>
  );
};

jest.mock("./components/cartItem", () => () => <div data-testid="cart-item" />);

jest.mock("./components/payResume", () => () => (
  <div data-testid="pay-resume" />
));

describe("CartView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("CartView: render default", () => {
    render(<Component />);
    expect(screen.getByTestId("cart-view")).toBeInTheDocument();
    expect(
      screen.getByText(`CART (${mockSelectedProducts.length})`)
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("cart-item")).toHaveLength(
      mockSelectedProducts.length
    );
    expect(screen.getByTestId("pay-resume")).toBeInTheDocument();
  });
});
