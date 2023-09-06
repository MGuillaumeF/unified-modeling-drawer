import { IpcRendererEvent } from "electron";
import React from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelDrawArea } from "./components/ModelDrawArea/ModelDrawArea";
import NewModelForm from "./components/pages/NewProjectForm/NewProjectForm";
import OpenProjectPage from "./components/pages/OpenProjectPage/OpenProjectPage";
import { add } from "./exchanges";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  if ("electronAPI" in window) {
    window.electronAPI.handleChangeLanguage(
      (event: IpcRendererEvent, value: string): void => {
        window.localStorage.setItem("language", value);
        i18n.changeLanguage(value);
      }
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>Page not found</div>}></Route>
        {/* <Route path="/" element={<MainPage />}></Route> */}
        <Route path="/" element={<ModelDrawArea />}></Route>
        <Route
          path="/model/new"
          element={<NewModelForm addProjectObject={add} />}
        ></Route>
        <Route
          path="/model/entry"
          element={<OpenProjectPage id="open-project-page" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.body);
root.render(<App />);

reportWebVitals(console.log);
