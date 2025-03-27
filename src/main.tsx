import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={{}}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
