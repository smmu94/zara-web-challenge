import React from "react";
import { render, screen } from "@testing-library/react";
import Button from ".";
import { ButtonProps } from "./types";
import userEvent from "@testing-library/user-event";

const props: ButtonProps = {
  style: "Primary",
  isDisabled: false,
  onClick: jest.fn(),
  isExtraHeight: false,
  children: "Click me",
};

describe("Button", () => {
  it("Button: should render children", () => {
    render(
      <Button onClick={props.onClick} style={props.style}>
        Click me
      </Button>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("Button: should render primary button", () => {
    const { container } = render(
      <Button style="Primary" onClick={props.onClick}>
        Click me
      </Button>
    );
    expect(container.firstChild).toHaveClass("button primary");
  });

  it("Button: should render disabled button", () => {
    const { container } = render(
      <Button isDisabled onClick={props.onClick} style={props.style}>
        Click me
      </Button>
    );
    expect(container.firstChild).toBeDisabled();
  });

  it("Button: should render extra height button", () => {
    const { container } = render(
      <Button onClick={props.onClick} style={props.style} isExtraHeight>
        Click me
      </Button>
    );
    expect(container.firstChild).toHaveClass("button extraHeight");
  });

  it("Button: should call onClick", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button style={props.style} onClick={onClick}>
        Click me
      </Button>
    );
    userEvent.click(getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });
});
