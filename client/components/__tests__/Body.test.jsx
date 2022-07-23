/**
 * @jest-environment jsdom
 */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import App from "../../App";

test("seller link on bottom left of homepage works", () => {
  render(
    <Router>
      <Body />
    </Router>
  );
  const linkElement = screen.getByTestId("link-1");
  expect(linkElement.href).toContain("/seller");
});
test("does login button read the word login", () => {
  render(
    <Router>
      <Body />
    </Router>
  );
  const buttonElement = screen.getByTestId("login-button");
  expect(buttonElement.textContent).toBe("Login");
});
