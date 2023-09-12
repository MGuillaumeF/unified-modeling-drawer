import React, { useCallback, useRef, useState } from "react";
import Button from "../../BasicButton/Button";
import style from "./MainPage.scss";

type Props = {};

function getAddProjectOnClick(updater: (addValue: string) => void) {
  return () => {
    const child = window.open(
      `./model/entry`,
      "Ajouter un projet",
      "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=400,popup=yes"
    );
    if (child)
      child.addEventListener(
        "message",
        (event) => {
          if (event.orgin !== window.origin)
            return;
          console.log("herer", event);
          if (event.data.project) {
            updater(event.data.project.name);
          }
        },
        false
      );
  };
}

function MainPage({}: Props) {
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const projectNamesRef = useRef<string[]>([]);
  const getUpdater = useCallback(
    (addValue: string) => {
      projectNamesRef.current.push(addValue);
      setProjectNames([...projectNamesRef.current]);
    },
    [setProjectNames, projectNamesRef]
  );

  return (
    <main>
      <aside className={style["projects"]}>
        <div className={style["tree-projects"]}>
          <h2>Projets :</h2>
          <div className={style["tree-projects-list"]}>
            <ul>
              {projectNames.map((value: string): JSX.Element => {
                return <li key={value}>{value}</li>;
              })}
            </ul>
          </div>
          <Button
            id="add-projet"
            type="button"
            onClick={getAddProjectOnClick(getUpdater)}
          >
            +
          </Button>
        </div>
        <span id="app-version">1.0.0</span>
      </aside>
      <section></section>
    </main>
  );
}

export default MainPage;
