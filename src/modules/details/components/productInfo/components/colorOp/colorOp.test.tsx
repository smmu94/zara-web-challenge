import React from "react";
import { render, screen } from "@testing-library/react";
import ColorOp from ".";
import { ColorOpProps } from "./types";
import { faker } from "@faker-js/faker/.";

const mockColorOp: ColorOpProps = {
  color: faker.color.rgb(),
  isSelected: false,
  onClick: jest.fn(),
  id: faker.datatype.uuid(),
};

describe("productInfo - ColorOp", () => {
  it("ColorOp: should render default", () => {
    render(<ColorOp {...mockColorOp} />);
    expect(screen.getByTestId("productInfo-colorOp")).toBeInTheDocument();
    expect(screen.getByTestId("productInfo-colorOp").firstElementChild).toHaveStyle(
      `background-color: ${mockColorOp.color}`
    );
  });
  it("ColorOp: should render the selected class if is is true", () => {
    render(<ColorOp {...mockColorOp} isSelected />);
    expect(screen.getByTestId("productInfo-colorOp")).toHaveClass("selected");
  });
  it("ColorOp: should call onClick", () => {
    render(<ColorOp {...mockColorOp} />);
    screen.getByTestId("productInfo-colorOp").click();
    expect(mockColorOp.onClick).toHaveBeenCalled();
  });
});
