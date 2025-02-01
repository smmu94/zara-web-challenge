import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { mockProduct } from "@utils/tests/mockProduct";
import { render, screen } from "@testing-library/react";
import PayResume from ".";
import { SelectedProduct } from "@contexts/selectedProductsContext/types";
import routes from "@utils/routes";
import { useRouter } from "next/router";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

const mockSetSelectedProducts = jest.fn();

type ComponentProps = {
  product?: SelectedProduct;
};

const Component = ({ product }: ComponentProps) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SelectedProductsContext.Provider
        value={{
          selectedProducts: product ? [product] : [],
          setSelectedProducts: mockSetSelectedProducts,
        }}
      >
        <PayResume />
      </SelectedProductsContext.Provider>
    </QueryClientProvider>
  );
};

describe("CartView - PayResume", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.innerWidth = 393;
    window.dispatchEvent(new Event("resize"));
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });
  it("PayResume: render default", () => {
    render(<Component product={mockProduct} />);
    expect(screen.getByTestId("payResume")).toBeInTheDocument();
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProduct.storage.price} EUR`)
    ).toBeInTheDocument();
    expect(screen.getByText("CONTINUE SHOPPING")).toBeInTheDocument();
    expect(screen.getByText("PAY")).toBeInTheDocument();
  });
  it("PayResume: render when no products", () => {
    render(<Component />);
    expect(screen.getByTestId("payResume")).toBeInTheDocument();
    expect(screen.queryByText("TOTAL")).not.toBeInTheDocument();
    expect(screen.queryByText("CONTINUE SHOPPING")).toBeInTheDocument();
    expect(screen.queryByText("PAY")).not.toBeInTheDocument();
  });
  it("PayResume: should call goToListView", () => {
    render(<Component product={mockProduct} />);
    screen.getByText("CONTINUE SHOPPING").click();
    expect(pushMock).toHaveBeenCalledWith(routes.home.main);
  });
});
