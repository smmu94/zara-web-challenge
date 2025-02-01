import React from "react";
import { ProductsListContext } from "@contexts/productsListContext";
import { listMock } from "@services/list/dataMock";
import Search from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductListBody } from "@services/list/types";
import { faker } from "@faker-js/faker/.";

const currentList: ProductListBody = [
  ...listMock,
  {
    id: faker.datatype.uuid(),
    brand: faker.lorem.sentence(),
    name: "name",
    basePrice: +faker.commerce.price(),
    imageUrl: faker.image.imageUrl(),
  },
];

type ComponentProps = {
  productList?: typeof currentList;
};

const Component = ({ productList }: ComponentProps) => (
  <ProductsListContext.Provider
    value={{
      search: "",
      setProductsList: jest.fn(),
      productsList: productList || currentList,
      setSearch: jest.fn(),
    }}
  >
    <Search />
  </ProductsListContext.Provider>
);
describe("ListView - Search", () => {
  it("Search: render default", () => {
    render(<Component />);
    expect(screen.getByTestId("ListView-Search")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a smartphone...")
    ).toBeInTheDocument();
    expect(screen.getByText(`${currentList.length} RESULTS`)).toBeInTheDocument();
  });
  it("Search: change input value and check results", () => {
    const { rerender } = render(<Component />);
    const input = screen.getByPlaceholderText("Search for a smartphone...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    input.focus();
    userEvent.type(input, "name");
    const currentProductsList = currentList.filter((product) =>
      product.name.includes("name")
    );
    rerender(<Component productList={currentProductsList} />);
    expect(input).toHaveValue("name");
    expect(screen.getByText("1 RESULTS")).toBeInTheDocument();
  });
  it("Search: change input value and no match results", async () => {
    const { rerender } = render(<Component />);
    const input = screen.getByPlaceholderText("Search for a smartphone...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    input.focus();
    userEvent.type(input, "no match");
    rerender(<Component productList={[]} />);
    expect(input).toHaveValue("no match");
    expect(screen.getByText("0 RESULTS")).toBeInTheDocument();
  });
});
