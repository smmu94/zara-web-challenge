import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from ".";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { FormProvider, useForm } from "react-hook-form";
import { FormData, initialValues } from "./form";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";
import { detailsMock } from "@services/details/dataMock";
import userEvent from "@testing-library/user-event";
import routes from "@utils/routes";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

const mockDetails = detailsMock;

jest.mock("@modules/details/hooks/useGetQueryDetails", () => ({
  useGetQueryDetails: jest.fn(),
}));

const Component = () => {
  const methods = useForm<FormData>({
    defaultValues: initialValues,
  });
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SelectedProductsContext.Provider
        value={{
          selectedProducts: [],
          setSelectedProducts: jest.fn(),
        }}
      >
        <FormProvider {...methods}>
          <ProductInfo />
        </FormProvider>
      </SelectedProductsContext.Provider>
    </QueryClientProvider>
  );
};

describe("ProductInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: mockDetails,
    });
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
  });
  it("ProductInfo: render default", () => {
    render(<Component />);
    expect(screen.getByTestId("detailsView-productInfo")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.getByText(mockDetails.name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getByText(`From ${mockDetails.basePrice} EUR`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("storage")).toBeInTheDocument();
    expect(
      screen.getByText("STORAGE ¿HOW MUCH SPACE DO YOU NEED?")
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("productInfo-storage")).toHaveLength(
      mockDetails.storageOptions.length
    );
    expect(screen.getByTestId("color")).toBeInTheDocument();
    expect(screen.getByText("COLOR. PICK YOUR FAVOURITE.")).toBeInTheDocument();
    expect(screen.getAllByTestId("productInfo-colorOp")).toHaveLength(
      mockDetails.colorOptions.length
    );
    const addToCartButton = screen.getByRole("button");
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeDisabled();
  });
  it("ProductInfo: should not render the component if product is not provided", () => {
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: null,
    });
    render(<Component />);
    expect(
      screen.queryByTestId("detailsView-productInfo")
    ).not.toBeInTheDocument();
  });
  it("ProductInfo: should addToCart product", () => {
    render(<Component />);
    const storageOp = screen.getAllByTestId("productInfo-storage")[0];
    storageOp.click();
    expect(storageOp).toHaveClass("selected");
    const colorOp = screen.getAllByTestId("productInfo-colorOp")[0];
    colorOp.click();
    expect(colorOp).toHaveClass("selected");
    expect(screen.getByText(mockDetails.colorOptions[0].name)).toBeInTheDocument();
    const addToCartButton = screen.getByText("AÑADIR");
    expect(addToCartButton).not.toBeDisabled();
    userEvent.click(addToCartButton);
    expect(pushMock).toHaveBeenCalledWith(routes.cart.main);
  });
  it("ProductInfo: should not addToCart product if storage is not selected", () => {
    render(<Component />);
    const colorOp = screen.getAllByTestId("productInfo-colorOp")[0];
    colorOp.click();
    expect(colorOp).toHaveClass("selected");
    const addToCartButton = screen.getByText("AÑADIR");
    expect(addToCartButton).toBeDisabled();
    userEvent.click(addToCartButton);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
