import { IpcRendererEvent } from "electron";
import React from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelDrawArea } from "./components/ModelDrawArea/ModelDrawArea";
import NewModelForm from "./components/pages/NewModelForm/NewModelForm";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  if ("electronAPI" in window) {
    window.electronAPI.handleChangeLanguage(
      (event: IpcRendererEvent, value: any): void => {
        i18n.changeLanguage(value);
      }
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>Page not found</div>}></Route>
        <Route path="/" element={<ModelDrawArea />}></Route>
        <Route path="/model/new" element={<NewModelForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.body);
root.render(<App />);

reportWebVitals(console.log);
