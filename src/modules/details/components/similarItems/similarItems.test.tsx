import React from "react";
import { detailsMock } from "@services/details/dataMock";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";
import { render, screen } from "@testing-library/react";
import SimilarItems from ".";

const mockDetails = detailsMock;

jest.mock("@modules/details/hooks/useGetQueryDetails", () => ({
  useGetQueryDetails: jest.fn(),
}));

jest.mock("@components/card", () => {
  return () => <div data-testid="card">Card</div>;
});

describe("detailsView - SimilarItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: mockDetails,
    });
  });
  it("SimilarItems: should render default", () => {
    render(<SimilarItems />);
    expect(
      screen.getByTestId("detailsView-similarItems")
    ).toBeInTheDocument();
    expect(screen.getByText("SIMILAR ITEMS")).toBeInTheDocument();
    screen.getAllByText("Card").forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });
  it("SimilarItems: should not render the component if product is not provided", () => {
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: null,
    });
    render(<SimilarItems />);
    expect(
      screen.queryByTestId("detailsView-similarItems")
    ).not.toBeInTheDocument();
  });
});