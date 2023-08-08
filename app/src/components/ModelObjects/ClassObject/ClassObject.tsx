import i18next from "i18next";
import React, { useState } from "react";
import AttributeObject, {
  AttributeObjectProps
} from "../AttributeObject/AttributeObject";
import style from "./ClassObject.scss";
import { getOnDragEnd, getOnKeyUp, getOnMouseDown } from "./events";

export type ClassObjectProps = {
  attributes: Array<AttributeObjectProps>;
  isAbstract: boolean;
  name: string;
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

function getStyle(x: number, y: number): { left: number; top: number } {
  return { top: y, left: x };
}

function ClassObject({
  attributes,
  name,
  isAbstract
}: ClassObjectProps): React.JSX.Element {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState({ x: 0, y: 0 });

  return (
    <table
      tabIndex={0}
      style={getStyle(state.x, state.y)}
      draggable="true"
      className={style.ClassObject}
      onMouseDown={getOnMouseDown(setPos)}
      onDragEnd={getOnDragEnd(setState, pos)}
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
