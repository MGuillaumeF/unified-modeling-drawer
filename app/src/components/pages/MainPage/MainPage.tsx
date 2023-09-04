import React from "react";
import Button from "../../BasicButton/Button";

type Props = {};

function getAddProjectOnClick() {
  window.open(
    `${window.origin}/model/entry`,
    "Ajouter un projet",
    "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=400"
  );
}

function MainPage({}: Props) {
  return (
    <main>
      <aside>
        <div className="tree-projects">
          <h2>Projets :</h2>
          <div className="tree-projects-list"></div>
          <Button id="add-projet" type="button" onClick={getAddProjectOnClick}>
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
