import React from "react";
import ModelObject from "../../../.model/ModelObject";
import Button from "../../BasicButton/Button";
import Details from "../../Details/Details";

type Props = {
  models: ModelObject[];
};

function ImportModelForm({ models }: Props) {
  return (
    <>
      {models.map((model: ModelObject) => (
        <Details
          id={model.name}
          key={model.name}
          open={false}
          summaryChild={<>{model.name}</>}
        >
          <ul>
            <li>Projet : {model.name}</li>
            <li>Version : {model.version}</li>
            <li>Description : {model.description}</li>
            <li>Date de création : {model.creationDate.toLocaleString()}</li>
            <li>
              Dernière mise à jour : {model.lastUpdateDate.toLocaleString()}
            </li>
          </ul>
        </Details>
      ))}
      <Button id={"import-add-project-file"} type={"button"}>
        Importer
      </Button>
      <Button id={""} type={"button"}>
        Importer
      </Button>
    </>
  );
}

export default ImportModelForm;
