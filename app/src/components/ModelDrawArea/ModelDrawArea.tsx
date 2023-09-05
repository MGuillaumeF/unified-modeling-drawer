import { IpcRendererEvent } from "electron";
import React, { useState } from "react";
import AttributeModelObject from "src/.model/AttributeModelObject";
import ClassModelObject from "src/.model/ClassModelObject";
import DiagramObject from "../../.model/DiagramObject";
import ModelObject, { IModelObject } from "../../.model/ModelObject";
import ViewObject, { IViewObject } from "../../.model/ViewObject";
import HistoryManager from "../../HistoryManager/HistoryManager";
import ClassObject, {
  ClassObjectProps
} from "../ModelObjects/ClassObject/ClassObject";

const historyManager = new HistoryManager();

const getOnDragOver: React.DragEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

function classModelObjectToProps(
  classModelObject: ClassModelObject
): ClassObjectProps {
  return {
    name: classModelObject.name,
    isAbstract: classModelObject.isAbstract,
    attributes: classModelObject.attributes.map(
      (attribute: AttributeModelObject) => ({
        visibility: attribute.visibility,
        name: attribute.name,
        type: attribute.type
      })
    )
  };
}

export function ModelDrawArea(): React.JSX.Element {
  const [classModelObjectList, setClassModelObjectList] = useState<
    Array<ClassModelObject>
  >([]);
  const [diagramObjectList, setDiagramObjectList] = useState<
    Array<DiagramObject>
  >([]);

  if ("electronAPI" in window) {
    window.electronAPI.handleOpenFile(
      (
        event: IpcRendererEvent,
        model: IModelObject,
        view: IViewObject
      ): void => {
        const modelObject = new ModelObject(model);
        const viewObject = new ViewObject(view);
        console.log(event, model, modelObject);
        setClassModelObjectList(modelObject.classModelObjects);
        setDiagramObjectList(viewObject.diagrams);
      }
    );
  }

  return (
    <>
      {diagramObjectList.map((diagramObject: DiagramObject): JSX.Element => {
        return (
          <div key={diagramObject.name}>
            <h2>{diagramObject.name}</h2>
            <div onDragOver={getOnDragOver}>
              {diagramObject.cards.map((item): JSX.Element => {
                const classObject = classModelObjectList.find(
                  (classObject: ClassModelObject): boolean =>
                    item.name === classObject.name
                );
                const convertedClassObject = classObject
                  ? classModelObjectToProps(classObject)
                  : null;
                return convertedClassObject ? (
                  <ClassObject
                    key={convertedClassObject.name}
                    name={convertedClassObject.name}
                    x={item.x}
                    y={item.y}
                    isAbstract={convertedClassObject.isAbstract}
                    attributes={convertedClassObject.attributes}
                  />
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
