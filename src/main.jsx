import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DiaryProvider } from "./Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DiaryProvider>
    <App />
  </DiaryProvider>
);