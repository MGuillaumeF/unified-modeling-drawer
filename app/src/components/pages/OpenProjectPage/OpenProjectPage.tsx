import React, { useState } from "react";
import ProjectObject from "../../../.model/ProjectObject";
import { add } from "../../../exchanges";
import Button from "../../BasicButton/Button";
import ImportProjectForm from "../ImportProjectForm/ImportProjectForm";
import NewModelForm from "../NewProjectForm/NewProjectForm";
import style from "./OpenProjectPage.scss";

const EXAMPLE_MODELS = [
  new ProjectObject(
    ProjectObject.parse({
      model: [{ class: [] }],
      view: [{ diagram: [] }],
      creation_date: 0,
      description: ["example of project"],
      last_update_date: 0,
      name: ["Project_A"],
      version: ["0.0.1"]
    })
  )
];

type Props = {
  id: string;
};

const getOnClick = (
  updater: React.Dispatch<React.SetStateAction<"new" | "import">>,
  value: "new" | "import"
): (() => void) => {
  return () => updater(value);
};

function OpenProjectPage({ id }: Props) {
  const [choice, setChoice] = useState<"new" | "import">("new");
  return (
    <div id={id} className={style["open-project-page"]}>
      <div className={style["open-project-method-selector"]}>
        <Button
          id="open-project-new"
          type="button"
          className={choice === "new" ? style["active"] : style["unactive"]}
          onClick={getOnClick(setChoice, "new")}
        >
          Nouveau
        </Button>
        <Button
          id="open-project-import"
          type="button"
          className={choice === "import" ? style["active"] : style["unactive"]}
          onClick={getOnClick(setChoice, "import")}
        >
          Importer
        </Button>
      </div>
      {choice === "new" ? (
        <NewModelForm addProjectObject={add} />
      ) : (
        <ImportProjectForm projects={EXAMPLE_MODELS} />
      )}
    </div>
  );
}

export default OpenProjectPage;
