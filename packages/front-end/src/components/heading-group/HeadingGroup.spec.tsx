import { render, screen } from "@testing-library/react";
import { HeadingGroup } from "./HeadingGroup";

it("displays a title", () => {
  const title = "Hello World!";
  render(<HeadingGroup title={title} />);
  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
});

it("displays a subtitle", () => {
  const subtitle = "Lorem Ipsum Dolor";
  render(<HeadingGroup title="Hello World!" subtitle={subtitle} />);
  const subtitleRendered = screen.getByRole("doc-subtitle");
  expect(subtitleRendered).toBeInTheDocument();
  expect(subtitleRendered).toHaveTextContent(subtitle);
});
