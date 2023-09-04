import React from "react";
import ModelObject from "../../../.model/ModelObject";
import Button from "../../BasicButton/Button";
import BasicInput from "../../BasicInput/BasicInput";
import Details from "../../Details/Details";
import style from "./ImportModelForm.scss";

type Props = {
  models: ModelObject[];
};

function ImportModelForm({ models }: Props) {
  return (
    <>
      <h2>Aperçu des projets à importer</h2>
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
      <div className={style["import-button"]}>
        <BasicInput
          type="file"
          name="import"
          id="add-import-file"
          label={"Ajouter"}
        />
        <Button id={"import-apply"} type={"submit"} level="primary">
          Importer
        </Button>
      </div>
    </>
  );
}

export default ImportModelForm;
