import React from "react";
import { render, screen } from "@testing-library/react";
import Card from ".";
import { CardProps } from "./types";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker/.";
import routes from "@utils/routes";

const props: CardProps = {
  id: faker.string.uuid(),
  imageUrl: faker.image.url(),
  name: faker.commerce.productName(),
  brand: faker.commerce.productName(),
  basePrice: +faker.commerce.price(),
};

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("Card", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock
    });
  });
  it("should render Card component", () => {
    render(<Card {...props} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(props.brand.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`${props.basePrice} EUR`)).toBeInTheDocument();
  });
  it("should call router.push when clicked", () => {
    render(<Card {...props} />);
    screen.getByTestId("card").click();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: routes.detail.main,
      query: { id: props.id },
    });
  });
});
