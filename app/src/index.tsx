import React, { useState } from "react";
import { render } from "react-dom";
import { useTranslation } from "react-i18next";
import HistoryManager from "./HistoryManager/HistoryManager";
import ClassObject, {
  ClassObjectProps
} from "./components/ModelObjects/ClassObject/ClassObject";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const historyManager = new HistoryManager();

const getOnDragOver: React.DragEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

function App(): React.JSX.Element {
  const [classObjectList, setClassObjectList] = useState<
    Array<ClassObjectProps>
  >([]);
  const { i18n } = useTranslation();

  if ("electronAPI" in window) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.handleOpenFile((event, value) => {
      console.log(event, value);
      const classObjectList = value.model.class.map((item: any) => ({
        name: item.$.name,
        isAbstract: item.$.abstract === "true",
        attributes: item.attribute.map((item: any) => ({
          visibility: item.$.visibility,
          name: item.$.name,
          type: item.$.type
        }))
      }));
      setClassObjectList(classObjectList);
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.handleChangeLanguage((event, value) => {
      console.log(event, value);
      i18n.changeLanguage(value);
    });
  }

  return (
    <div>
      <div onDragOver={getOnDragOver}>
        {classObjectList.map((item) => (
          <ClassObject
            key={item.name}
            name={item.name}
            isAbstract={item.isAbstract}
            attributes={item.attributes}
          />
        ))}
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
reportWebVitals(console.log);
