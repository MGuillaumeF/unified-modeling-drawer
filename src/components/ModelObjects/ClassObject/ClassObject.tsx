import React, { useState } from "react";
import style from "./ClassObject.scss";
type Props = {
  attributes: Array<{
    name: string;
    type: string;
    visibility: "private" | "protected" | "public";
  }>;
  name: string;
};

function getOnDragEnd(
  setState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  pos: {
    x: number;
    y: number;
  }
): React.DragEventHandler<HTMLDivElement> {
  return (event): void => {
    // const ev = {x : event.nativeEvent.clientX, y : event.nativeEvent.clientY}
    const ev = {
      x: event.nativeEvent.pageX - pos.x,
      y: event.nativeEvent.pageY - pos.y
    };
    // alert(JSON.stringify({event : "end", ...ev}))
    setState(ev);
  };
}

function getOnMouseDown(
  setState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >
): React.MouseEventHandler<HTMLDivElement> {
  return (event) => {
    setState({
      x: event.nativeEvent.pageX - event.currentTarget.offsetLeft,
      y: event.nativeEvent.pageY - event.currentTarget.offsetTop
    });
  };
}

function getVisibilityChar(
  visibility: "private" | "protected" | "public"
): React.ReactNode {
  let visibilityChar = "+";
  if (visibility === "private") {
    visibilityChar = "-";
  } else if (visibility === "protected") {
    visibilityChar = "#";
  }
  return visibilityChar;
}

function getStyle(x: number, y: number): { left: number; top: number } {
  return { top: y, left: x };
}

function ClassObject({ attributes, name }: Props): JSX.Element {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState({ x: 0, y: 0 });

  return (
    <table
      style={getStyle(state.x, state.y)}
      draggable="true"
      className={style.ClassObject}
      onMouseDown={getOnMouseDown(setPos)}
      onDragEnd={getOnDragEnd(setState, pos)}
    >
      <thead>
        <tr>
          <th>{name}</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attribute) => (
          <tr key={attribute.name}>
            <td>
              {getVisibilityChar(attribute.visibility)} {attribute.type}{" "}
              {attribute.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClassObject;
