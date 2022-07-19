/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, cleanup } from "@testing-library/react";
import Nav from "../Nav";
import App from "../../App";

test("renders react component", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
// test("should render div in Nav", () => {
//   render(<Nav />);
//   const navElement = screen.getByTestId("nav-1");
//   expect(navElement).toBeInTheDocument();
// });
