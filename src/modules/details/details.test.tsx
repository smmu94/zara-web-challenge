import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsView from ".";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { detailsMock } from "@services/details/dataMock";
import { useRouter } from "next/router";
import routes from "@utils/routes";
import { useGetDetailsId } from "./hooks/useGetDetailsId";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

const idMock = "1";
jest.mock("./hooks/useGetDetailsId", () => ({
  useGetDetailsId: jest.fn(),
}));

jest.mock("./components/productInfo", () => {
  return () => <div data-testid="product-info">Product Info</div>;
});

jest.mock("./components/specifications", () => {
  return () => <div data-testid="specifications">Specifications</div>;
});

jest.mock("./components/similarItems", () => {
  return () => <div data-testid="similar-items">Similar Items</div>;
});

const Component = () => (
  <QueryClientProvider client={new QueryClient()}>
    <DetailsView />
  </QueryClientProvider>
);

describe("DetailsView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetDetailsId as jest.Mock).mockReturnValue({
      id: idMock,
    });
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: detailsMock,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
  });
  it("DetailsView: should render the component", () => {
    render(<Component />);
    expect(screen.getByTestId("details-view")).toBeInTheDocument();
    const backLink = screen.getByText("BACK");
    expect(backLink.closest("a")).toHaveAttribute("href", routes.home.main);
    expect(screen.getByTestId("product-info")).toBeInTheDocument();
    expect(screen.getByTestId("specifications")).toBeInTheDocument();
    expect(screen.getByTestId("similar-items")).toBeInTheDocument();
  });
  it("DetailsView: should render the loading state", () => {
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: true,
    }));
    render(<Component />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("DetailsView: should render the error state", () => {
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isError: true,
    }));
    render(<Component />);
    expect(screen.getByText("Something went wrong...")).toBeInTheDocument();
  });
});
