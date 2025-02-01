import React from "react";
import { render, screen } from "@testing-library/react";
import Storage from ".";
import { StorageProps } from "./types";
import { faker } from "@faker-js/faker/.";

const mockStorage: StorageProps = {
  storage: faker.word.noun(),
  isSelected: false,
  onClick: jest.fn(),
  id: faker.datatype.uuid(),
};

describe("productInfo - Storage", () => {
  it("Storage: should render default", () => {
    render(<Storage {...mockStorage} />);
    expect(screen.getByText(mockStorage.storage)).toBeInTheDocument();
  });
  it("Storage: should render the selected class if isSelected is true", () => {
    render(<Storage {...mockStorage} isSelected />);
    expect(screen.getByText(mockStorage.storage)).toHaveClass("selected");
  });
  it("Storage: should call onClick", () => {
    render(<Storage {...mockStorage} />);
    screen.getByText(mockStorage.storage).click();
    expect(mockStorage.onClick).toHaveBeenCalled();
  });
});