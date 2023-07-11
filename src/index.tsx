import React, { useCallback } from "react";
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
const getOnDragOver: React.DragEventHandler<HTMLDivElement> = (e) => e.preventDefault()
const dropZoneStyle= {width : 500, height : 500, border : "1px solid red"}
function App(): JSX.Element {
  const { i18n, t } = useTranslation();

  const onLanguageClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      changeLangBtnClick(event, i18n);
    },
    [i18n]
  );

  return (
      <div >
        <div style={dropZoneStyle} onDragOver={getOnDragOver}>

       <ClassObject/>
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
