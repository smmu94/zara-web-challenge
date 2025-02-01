import React from "react";
import { render, screen } from "@testing-library/react";
import Cards from ".";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { listMock } from "@services/list/dataMock";
import { ProductsListContext } from "@contexts/productsListContext";
import routes from "@utils/routes";
import { useRouter } from "next/router";
import { ProductListBody } from "@services/list/types";

const mockSetProductsList = jest.fn();

type ComponentProps = {
  productList?: ProductListBody;
};

const Component = ({ productList }: ComponentProps) => (
  <QueryClientProvider client={new QueryClient()}>
    <ProductsListContext.Provider
      value={{
        search: "",
        setProductsList: mockSetProductsList,
        productsList: productList || [],
        setSearch: jest.fn(),
      }}
    >
      <Cards />
    </ProductsListContext.Provider>
  </QueryClientProvider>
);

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("ListView - Cards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockResolvedValue({
      data: listMock,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
  });
  it("Cards: render list of cards", () => {
    render(<Component productList={listMock}/>);
    expect(screen.getByTestId("ListView-Cards")).toBeInTheDocument();
    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(listMock.length);
    cards.forEach((card, i) => {
      expect(card).toHaveTextContent(listMock[i].brand.toUpperCase());
      expect(card).toHaveTextContent(listMock[i].name.toUpperCase());
      expect(card).toHaveTextContent(`${listMock[i].basePrice} EUR`);
    });
  });
  it("Cards: render loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<Component />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("Cards: render error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<Component />);
    expect(screen.getByText("Something went wrong...")).toBeInTheDocument();
  });
  it("Cards: render no results found", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    render(<Component />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
  it("Cards: go to Details View", () => {
    render(<Component productList={listMock}/>);
    const card = screen.getAllByTestId("card")[0];
    card.click();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: routes.detail.main,
      query: { id: listMock[0].id },
    });
  });
});
