export type Visibility = "private" | "protected" | "public";

export function getVisibilityChar(visibility: Visibility): React.ReactNode {
  let visibilityChar = "+";
  if (visibility === "private") {
    visibilityChar = "-";
  } else if (visibility === "protected") {
    visibilityChar = "#";
  }
  return visibilityChar;
}
