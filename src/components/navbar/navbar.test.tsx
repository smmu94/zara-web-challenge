import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from ".";
import routes from "@utils/routes";

describe("Navbar", () => {
  it("Navbar: should render the navbar with the correct links", () => {
    render(<Navbar />);
    const logo = screen.getAllByRole("img")[0];
    expect(logo).toHaveAttribute("alt", "logo");
    expect(logo.closest("a")).toHaveAttribute("href", routes.home.main);
    const cart = screen.getAllByRole("img")[1];
    expect(cart).toHaveAttribute("alt", "cart");
    expect(cart.closest("a")).toHaveAttribute("href", routes.cart.main);
  });
});
