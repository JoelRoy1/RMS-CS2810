import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MenuPage from "./MenuPage";
import { BrowserRouter } from "react-router-dom";

const mockDish = { id: 1, name: "Veg Pasta", price: "12.99", quantity: 1 };

test("Add to Cart Functionality", () => {
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

  const addToCartButton = screen.getByTestId("add-to-cart-0");

  fireEvent.click(addToCartButton);

  const firstDishName = mockDish.name;
  expect(screen.getAllByAltText(firstDishName)[0]).toBeInTheDocument();

  const expectedTotal = Number(mockDish.price);
  const total = screen.getByTestId("total-val").textContent;

  expect(Number(total)).toBe(expectedTotal);
});

test("Remove from Cart Functionality", () => {
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

  const addToCartButton = screen.getByTestId("add-to-cart-0");
  fireEvent.click(addToCartButton);

  const removeButton = screen.getByTestId("remove");

  fireEvent.click(removeButton);

  expect(removeButton).not.toBeInTheDocument();
});

test("Update Quantity Functionality", () => {
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

  const addToCartButton = screen.getByTestId("add-to-cart-0");
  fireEvent.click(addToCartButton);

  const plusBtn = screen.getByTestId("plus-btn");
  fireEvent.click(plusBtn);

  const value = screen.getByTestId("qty-value").value;
  expect(value).toBe("2");
});

test("Total price Functionality", () => {
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

  const addToCartButton = screen.getByTestId("add-to-cart-0");
  fireEvent.click(addToCartButton);

  const plusBtn = screen.getByTestId("plus-btn");
  fireEvent.click(plusBtn);

  const total = screen.getByTestId("total-val").textContent;
  expect(total).toBe("25.98");
});

test("Edge case: Empty Cart", () => {
  render(
    <BrowserRouter>
      <MenuPage />
    </BrowserRouter>
  );

  const total = screen.getByTestId("total-val").textContent;
  expect(total).toBe("0.00");
});
