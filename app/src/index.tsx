import React, { useCallback, useState } from "react";
import { render } from "react-dom";
import { useTranslation } from "react-i18next";
import Button from "./components/BasicButton/Button";
import ClassObject from "./components/ModelObjects/ClassObject/ClassObject";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const changeLangBtnClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18n: any
): void => {
  const currentBtnText = String(
    event?.currentTarget?.textContent
  ).toLowerCase();
  if (
    i18n &&
    typeof i18n === "object" &&
    "changeLanguage" in i18n &&
    ["fr", "en"].includes(currentBtnText)
  ) {
    i18n.changeLanguage(currentBtnText);
  }
};

const getOnDragOver: React.DragEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

const dropZoneStyle = { width: 500, height: 500, border: "1px solid red" };

function App(): JSX.Element {
  const [classObjectList, setClassObjectList] = useState<
    Array<{
      attributes: {
        name: string;
        type: string;
        visibility: "public" | "private" | "protected";
      }[];
      name: string;
    }>
  >([]);
  const { i18n, t } = useTranslation();

  const onLanguageClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      changeLangBtnClick(event, i18n);
    },
    [i18n]
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electronAPI.handleOpenFile((event, value) => {
    console.log(event, value);
    const classObjectList = value.model.class.map((item: any) => ({
      name: item.$.name,
      attributes: item.attribute.map((item: any) => ({
        visibility: item.$.visibility,
        name: item.$.name,
        type: item.$.type
      }))
    }));
    setClassObjectList(classObjectList);
  });

  return (
    <div>
      <div style={dropZoneStyle} onDragOver={getOnDragOver}>
        {classObjectList.map((item) => (
          <ClassObject
            key={item.name}
            name={item.name}
            attributes={item.attributes}
          />
        ))}
      </div>
      <div>
        <Button
          type="button"
          level="secondary"
          id="lang-fr"
          onClick={onLanguageClick}
        >
          FR
        </Button>
        <Button
          type="button"
          level="secondary"
          id="lang-en"
          onClick={onLanguageClick}
        >
          EN
        </Button>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
reportWebVitals(console.log);
