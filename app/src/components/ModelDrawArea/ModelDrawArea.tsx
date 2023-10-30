import { IpcRendererEvent } from "electron";
import React, { useState } from "react";
import AttributeModelObject from "src/.model/AttributeModelObject";
import ClassModelObject from "src/.model/ClassModelObject";
import DiagramObject, { Card } from "../../.model/DiagramObject";
import ProjectObject, { IProjectObject } from "../../.model/ProjectObject";
import HistoryManager from "../../HistoryManager/HistoryManager";
import { update } from "../../exchanges";
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
  const [projectObject, setProjectObject] = useState<ProjectObject | null>(
    null
  );

  if ("electronAPI" in window) {
    window.electronAPI.handleOpenFile(
      (event: IpcRendererEvent, project: IProjectObject): void => {
        setProjectObject(new ProjectObject(project));
      }
    );
  }
  const diagrams: DiagramObject[] = projectObject
    ? projectObject.viewObject.diagrams
    : [];
  return (
    <>
      {diagrams.map((diagramObject: DiagramObject): JSX.Element => {
        return (
          <div key={diagramObject.name}>
            <h2>{diagramObject.name}</h2>
            <div onDragOver={getOnDragOver}>
              {diagramObject.cards.map((item): JSX.Element => {
                const classclassObjects: ClassModelObject[] = projectObject
                  ? projectObject.modelObject.classModelObjects
                  : [];
                const classObject = classclassObjects.find(
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
                    onMove={getUpdatePosition(
                      projectObject,
                      setProjectObject,
                      diagramObject.name,
                      convertedClassObject.name
                    )}
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

function getUpdatePosition(
  projectObject: ProjectObject | null,
  updater: React.Dispatch<React.SetStateAction<ProjectObject | null>>,
  diagramName: string,
  cardName: string
): (x: number, y: number) => void {
  return (x: number, y: number): void => {
    if (projectObject) {
      const diagramToUpdate = projectObject.viewObject.diagrams.find(
        (diagram: DiagramObject): boolean => diagram.name === diagramName
      );
      if (diagramToUpdate) {
        const cardToUpdate = diagramToUpdate.cards.find(
          (card: Card) => card.name === cardName
        );
        if (cardToUpdate) {
          cardToUpdate.x = x;
          cardToUpdate.y = y;
          // remplacer l'appel de updater par une propagation d'action "from/to"
          // pour une prise en compte générique dans la mise à jour de l'objet
          // il n'est pas nécessaire de mettre à jour le state qui ne change que sur ouverture d'un nouveau projet
          update(projectObject.toObject());
        }
      }
    }
  };
}
