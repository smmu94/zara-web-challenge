import React from "react";
import { render, screen } from "@testing-library/react";
import ListView from ".";

jest.mock("./components/cards", () => {
  return () => <div data-testid="cards">Cards</div>;
});

jest.mock("./components/search", () => {
  return () => <div data-testid="search">Search</div>;
});

describe("ListView", () => {
  it("ListView: render default", () => {
    render(<ListView />);
    expect(screen.getByTestId("list-view")).toBeInTheDocument();
    expect(screen.getByTestId("cards")).toBeInTheDocument();
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });
});
