import React, { HTMLProps } from "react";
import style from "./Details.scss";

interface DetailsProps {
  children: React.ReactNode;
  id: string;
  internal?: {
    details?: HTMLProps<HTMLDetailsElement>;
    summary?: HTMLProps<HTMLElement>;
  };
  open: boolean;
  summaryChild: React.ReactElement;
}

/**
 *
 * @param props
 * @returns
 */
function Details(props: DetailsProps): React.JSX.Element {
  return (
    <details
      id={props.id}
      open={props.open}
      className={style.mocor}
      {...props?.internal?.details}
    >
      <summary {...props?.internal?.summary}>{props.summaryChild}</summary>
      {props.children}
    </details>
  );
}

export default Details;
