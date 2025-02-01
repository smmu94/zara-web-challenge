import React from "react";
import { render, screen } from "@testing-library/react";
import Button from ".";
import { ButtonProps } from "./types";
import userEvent from "@testing-library/user-event";

const mockButton: ButtonProps = {
  style: "Primary",
  isDisabled: false,
  onClick: jest.fn(),
  isExtraHeight: false,
  children: "Click me",
};

describe("Button", () => {
  it("Button: should render children", () => {
    render(
      <Button {...mockButton}>
        Click me
      </Button>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("Button: should render primary button", () => {
    const { container } = render(
      <Button {...mockButton}>
        Click me
      </Button>
    );
    expect(container.firstChild).toHaveClass("button primary");
  });

  it("Button: should render disabled button", () => {
    const { container } = render(
      <Button {...mockButton} isDisabled>
        Click me
      </Button>
    );
    expect(container.firstChild).toBeDisabled();
  });

  it("Button: should render extra height button", () => {
    const { container } = render(
      <Button {...mockButton} isExtraHeight>
        Click me
      </Button>
    );
    expect(container.firstChild).toHaveClass("button extraHeight");
  });

  it("Button: should call onClick", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button {...mockButton} onClick={onClick}>
        Click me
      </Button>
    );
    userEvent.click(getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });
});
