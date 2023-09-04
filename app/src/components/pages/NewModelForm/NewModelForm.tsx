import React, { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ModelObject from "../../../.model/ModelObject";
import Button from "../../BasicButton/Button";
import BasicInput from "../../BasicInput/BasicInput";
import style from "./NewModelForm.scss";

function onSubmit(event: FormEvent<HTMLFormElement>) {
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
  const modelObject = new ModelObject({
    name,
    description,
    version: "1.0.0",
    creationDate: new Date(),
    lastUpdateDate: new Date(),
    classModelObjects: []
  });
  if ("electronAPI" in window) {
    window.electronAPI.createModel(modelObject.toObject());
  }
}

const inputProperties = { required: true };

function NewModelForm() {
  const { t } = useTranslation();
  return (
    <div className={style.NewModelForm}>
      <form action="" onSubmit={onSubmit}>
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

export default NewModelForm;
