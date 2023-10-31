import React, { HTMLProps, ReactElement } from "react";
import style from "./Button.scss";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  id: string;
  level?: "primary" | "secondary" | "tertiary";
  type: "button" | "submit" | "reset";
}

function loadCss(css: {
  className?: string;
  level?: "primary" | "secondary" | "tertiary";
}): string {
  const processedClassName = [style.mocor];
  if (css.className) {
    processedClassName.push(...css.className.split(" "));
  }
  if (css.level) {
    processedClassName.push(levelMap.get(css.level) ?? "primary");
  }
  return processedClassName.join(" ");
}

const levelMap = new Map<string, string>([
  ["primary", style.primary],
  ["secondary", style.secondary],
  ["tertiary", style.tertiary]
]);

/**
 *
 * @param props
 * @returns
 */
function Button(props: Readonly<ButtonProps>): ReactElement {
  const { className, level } = props;
  return (
    <button {...props} className={loadCss({ className, level })}>
      {props.children ?? props.value}
    </button>
  );
}

export default Button;
