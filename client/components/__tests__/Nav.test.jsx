/**
 * @jest-environment jsdom
 */
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../Nav";
import App from "../../App";

test("renders react component", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
test("should render div in Nav", () => {
  render(
    <Router>
      <Nav />
    </Router>
  );
  const navElement = screen.getByTestId("nav-1");
  expect(navElement).toBeInTheDocument();
});
