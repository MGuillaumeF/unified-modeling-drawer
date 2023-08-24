import { IpcRendererEvent } from "electron";
import React, { useState } from "react";
import AttributeModelObject from "src/.model/AttributeModelObject";
import ClassModelObject from "src/.model/ClassModelObject";
import ModelObject, { IModelObject } from "../../.model/ModelObject";
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
      (event: IpcRendererEvent, value: IModelObject): void => {
        const modelObject = new ModelObject(value);
        console.log(event, value, modelObject);
        const classObjectList = modelObject.classModelObjects.map(
          (item: ClassModelObject) => ({
            name: item.name,
            isAbstract: item.isAbstract,
            attributes: item.attributes.map((item: AttributeModelObject) => ({
              visibility: item.visibility,
              name: item.name,
              type: item.type
            }))
          })
        );
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
