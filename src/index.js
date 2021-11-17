import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "boxicons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/index";

import { Helmet } from "react-helmet";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Helmet>
        <title>Cavalieri Suits</title>
        <meta
          name="description"
          content="Compra los mejores trajes a la medida, camisas, pantalones y zapatos italianos importados"
        />
      </Helmet>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
