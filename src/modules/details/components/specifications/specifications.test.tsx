import React from "react";
import { render, screen } from "@testing-library/react";
import Specifications from ".";
import { detailsMock } from "@services/details/dataMock";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";

const mockDetails = detailsMock;

jest.mock("@modules/details/hooks/useGetQueryDetails", () => ({
  useGetQueryDetails: jest.fn(),
}));

jest.mock("./components/specRow", () => {
  return () => <div data-testid="spec-row">Spec Row</div>;
});

describe("detailsView - Specifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: mockDetails,
    });
  });
  it("Specifications: should render the component", () => {
    render(<Specifications />);
    expect(
      screen.getByTestId("detailsView-specifications")
    ).toBeInTheDocument();
    expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();
    screen.getAllByText("Spec Row").forEach((specRow) => {
      expect(specRow).toBeInTheDocument();
    });
  });
  it("Specifications: should not render the component if product is not provided", () => {
    (useGetQueryDetails as jest.Mock).mockReturnValue({
      product: null,
    });
    render(<Specifications />);
    expect(
      screen.queryByTestId("detailsView-specifications")
    ).not.toBeInTheDocument();
  });
});
