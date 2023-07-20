import React from "react";
import { Visibility, getVisibilityChar } from "./translator";

export type AttributeObjectProps = {
  name: string;
  type: string;
  visibility: Visibility;
};

function AttributeObject(props: AttributeObjectProps): React.JSX.Element {
  return (
    <tr key={props.name}>
      <td>
        {getVisibilityChar(props.visibility)} {props.type} {props.name}
      </td>
    </tr>
  );
}

export default AttributeObject;