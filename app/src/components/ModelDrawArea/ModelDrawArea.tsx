import { IpcRendererEvent } from "electron";
import React, { useState } from "react";
import HistoryManager from "../../HistoryManager/HistoryManager";
import ClassObject, {
  ClassObjectProps
} from "../ModelObjects/ClassObject/ClassObject";

const historyManager = new HistoryManager();

const getOnDragOver: React.DragEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

export function ModelDrawArea(): React.JSX.Element {
  const [classObjectList, setClassObjectList] = useState<
    Array<ClassObjectProps>
  >([]);

  if ("electronAPI" in window) {
    window.electronAPI.handleOpenFile(
      (event: IpcRendererEvent, value: any): void => {
        console.log(event, value);
        const classObjectList = value.model.class.map((item: any) => ({
          name: item.$.name,
          isAbstract: item.$.abstract === "true",
          attributes: item.attribute.map((item: any) => ({
            visibility: item.$.visibility,
            name: item.$.name,
            type: item.$.type
          }))
        }));
        setClassObjectList(classObjectList);
      }
    );
  }

  return (
    <div>
      <div onDragOver={getOnDragOver}>
        {classObjectList.map((item) => (
          <ClassObject
            key={item.name}
            name={item.name}
            isAbstract={item.isAbstract}
            attributes={item.attributes}
          />
        ))}
      </div>
    </div>
  );
}
