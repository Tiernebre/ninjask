import { render, screen } from "@testing-library/react";
import { VersionTag } from "./VersionTag";

it.each([
  [1, "red"],
  [2, "blue"],
  [3, "yellow"],
  [4, "gold"],
  [5, "silver"],
  [6, "crystal"],
  [7, "ruby"],
  [8, "sapphire"],
  [9, "emerald"],
])(
  "for given version id = %p it displays %p correctly",
  (versionId, expectedName) => {
    render(<VersionTag id={versionId} />);
    const foundTag = screen.getByText(expectedName);
    expect(foundTag).toBeInTheDocument();
    expect(foundTag).toHaveClass(expectedName);
  }
);
