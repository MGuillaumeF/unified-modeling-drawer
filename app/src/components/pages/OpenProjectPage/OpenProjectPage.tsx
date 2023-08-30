import React, { useState } from "react";
import ModelObject from "../../../.model/ModelObject";
import Button from "../../BasicButton/Button";
import ImportModelForm from "../ImportModelForm/ImportModelForm";
import NewModelForm from "../NewModelForm/NewModelForm";
import style from "./OpenProjectPage.scss";

const EXAMPLE_MODELS = [
  new ModelObject(
    ModelObject.parse({
      class: [],
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
    <div id={id} className={style.OpenProjectPage}>
      <Button
        id="open-project-new"
        type="button"
        className={choice === "new" ? "active" : undefined}
        onClick={getOnClick(setChoice, "new")}
      >
        Nouveau
      </Button>
      <Button
        id="open-project-import"
        type="button"
        className={choice === "import" ? "active" : undefined}
        onClick={getOnClick(setChoice, "import")}
      >
        Importer
      </Button>
      {choice === "new" ? (
        <NewModelForm />
      ) : (
        <ImportModelForm models={EXAMPLE_MODELS} />
      )}
    </div>
  );
}

export default OpenProjectPage;
