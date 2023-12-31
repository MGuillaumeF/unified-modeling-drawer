import React, { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ProjectObject, { IProjectObject } from "../../../.model/ProjectObject";
import Button from "../../BasicButton/Button";
import BasicInput from "../../BasicInput/BasicInput";
import style from "./NewProjectForm.scss";

function getOnSubmit(
  addProjectObject: (projectObject: IProjectObject) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    const formData = new Map<string, string | null>(
      ["name", "description"].map((field: string) => {
        const fieldInput = formElements.namedItem(field);
        let value = null;
        if (
          fieldInput instanceof HTMLInputElement ||
          fieldInput instanceof RadioNodeList ||
          fieldInput instanceof HTMLTextAreaElement ||
          fieldInput instanceof HTMLSelectElement
        ) {
          value = fieldInput.value;
        }
        return [field, value];
      })
    );

    const name = formData.get("name") ?? "";
    const description = formData.get("description") ?? "";
    const projectObject = new ProjectObject({
      name,
      description,
      version: "1.0.0",
      creationDate: new Date(),
      lastUpdateDate: new Date(),
      modelObject: { classModelObjects: [] },
      viewObject: { diagramObjects: [] }
    });
    addProjectObject(projectObject.toObject());
  };
}

const inputProperties = { required: true };

function NewProjectForm(props: {
  addProjectObject: (projectObject: IProjectObject) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className={style.NewModelForm}>
      <form action="" onSubmit={getOnSubmit(props.addProjectObject)}>
        <BasicInput
          id="new-project-name"
          type="text"
          name="name"
          label={t("FORMS.NEW.INPUTS.NAME.PLACEHOLDER")}
          inputProperties={inputProperties}
        />
        <textarea
          name="description"
          cols={30}
          rows={10}
          required
          placeholder={t("FORMS.NEW.INPUTS.DESCRIPTION.PLACEHOLDER")}
        ></textarea>
        <Button
          id="create-new-model"
          type="submit"
          level="primary"
          value={t("FORMS.NEW.INPUTS.SUBMIT_BUTTON")}
        />
      </form>
    </div>
  );
}

export default NewProjectForm;
