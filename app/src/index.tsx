import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelDrawArea } from "./components/ModelDrawArea/ModelDrawArea";
import NewModelForm from "./components/pages/NewModelForm/NewModelForm";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

function App(): React.JSX.Element {
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

render(<App />, document.body);
reportWebVitals(console.log);
