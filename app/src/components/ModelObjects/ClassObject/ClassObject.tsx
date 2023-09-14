import i18next from "i18next";
import React, { CSSProperties, useState } from "react";
import AttributeObject, {
  AttributeObjectProps
} from "../AttributeObject/AttributeObject";
import style from "./ClassObject.scss";
import { getOnDragEnd, getOnKeyUp, getOnMouseDown } from "./events";

export type ClassObjectProps = {
  attributes: Array<AttributeObjectProps>;
  isAbstract: boolean;
  name: string;
  onMove?: (x: number, y: number) => void;
  x?: number;
  y?: number;
};

function callDelete(classObjectName: string): void {
  const choice = confirm(
    i18next.t("QUESTION.CONFIRM.DELETE_OBJECT", { objectName: classObjectName })
  );
  if (choice) {
    alert(i18next.t("TODO_DELETE_OBJECT"));
  }
}
function callEdit(classObjectName: string): void {
  alert(i18next.t("TODO_OPEN_EDIT_OBJECT_WINDOW"));
}

function getStyle(x: number, y: number): CSSProperties {
  return { top: `${y}px`, left: `${x}px` };
}

function ClassObject({
  attributes,
  name,
  isAbstract,
  x,
  y,
  onMove
}: ClassObjectProps): React.JSX.Element {
  const [pos, setPos] = useState({ x: x ?? 0, y: y ?? 0 });
  const [state, setState] = useState({ x: x ?? 0, y: y ?? 0 });

  return (
    <table
      tabIndex={0}
      style={getStyle(state.x, state.y)}
      draggable="true"
      className={style.ClassObject}
      onMouseDown={getOnMouseDown(setPos)}
      onDragEnd={getOnDragEnd(setState, pos, onMove)}
      onKeyUp={getOnKeyUp(name, callDelete, callEdit)}
    >
      <thead>
        {isAbstract ? (
          <tr className={style.StereoTypes}>
            <th>&lt;&lt; abstract &gt;&gt;</th>
          </tr>
        ) : null}
        <tr>
          <th>{name}</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attribute) => (
          <AttributeObject key={attribute.name} {...attribute} />
        ))}
      </tbody>
    </table>
  );
}

export default ClassObject;
