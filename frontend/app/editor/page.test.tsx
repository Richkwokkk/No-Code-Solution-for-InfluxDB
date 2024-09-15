import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import Page from "@/app/editor/page";

describe("Editor Page", () => {
  it("renders the Editor Page text", () => {
    render(<Page />);
    const pageText = screen.getByText("Editor Page");
    expect(pageText).toBeInTheDocument();
  });

  it("renders a div element", () => {
    const { container } = render(<Page />);
    const divElement = container.querySelector("div");
    expect(divElement).toBeInTheDocument();
  });

  it("renders only one child element", () => {
    const { container } = render(<Page />);
    expect(container.firstChild?.childNodes.length).toBe(1);
  });
});
