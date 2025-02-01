import React from "react";
import { render, screen } from "@testing-library/react";
import SpecRow from ".";

describe("Specifications - SpecRow", () => {
  it("SpecRow: should render correctly", () => {
    render(<SpecRow title="title" description="description" />);
    expect(screen.getByTestId("spect-row")).toBeInTheDocument;
    expect(screen.getByText("TITLE")).toBeInTheDocument;
    expect(screen.getByText("description")).toBeInTheDocument;
  });
  it("SpecRow: should have first className if isFirst is true", () => {
    render(<SpecRow title="title" description="description" isFirst />);
    expect(screen.getByTestId("spect-row")).toHaveClass("first");       
  });
});
