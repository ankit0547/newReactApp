// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppStore } from "./redux/store.jsx";
import Loader from "./components/common/loader.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={AppStore}>
      <Loader />
      <App />
    </Provider>
  </BrowserRouter>
);
