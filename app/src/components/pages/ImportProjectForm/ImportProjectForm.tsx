import React from "react";
import ProjectObject from "../../../.model/ProjectObject";
import Button from "../../BasicButton/Button";
import BasicInput from "../../BasicInput/BasicInput";
import Details from "../../Details/Details";
import style from "./ImportProjectForm.scss";

type Props = {
  projects: ProjectObject[];
};

function ImportProjectForm({ projects }: Props) {
  return (
    <>
      <h2>Aperçu des projets à importer</h2>
      {projects.map((project: ProjectObject) => (
        <Details
          id={project.name}
          key={project.name}
          open={false}
          summaryChild={<>{project.name}</>}
        >
          <ul>
            <li>Projet : {project.name}</li>
            <li>Version : {project.version}</li>
            <li>Description : {project.description}</li>
            <li>Date de création : {project.creationDate.toLocaleString()}</li>
            <li>
              Dernière mise à jour : {project.lastUpdateDate.toLocaleString()}
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

export default ImportProjectForm;
