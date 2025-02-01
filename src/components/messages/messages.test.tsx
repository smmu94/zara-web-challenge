import React from "react";
import Messages from ".";
import { faker } from "@faker-js/faker/.";
import { render, screen } from "@testing-library/react";

describe("Messages", () => {
  it("Messages: should render default", () => {
    const message = faker.word.words();
    render(<Messages message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
  it("Messages: should render error message", () => {
    const errorMessage = faker.word.words();
    render(<Messages message={errorMessage} isError />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveClass("error");
  });
});
