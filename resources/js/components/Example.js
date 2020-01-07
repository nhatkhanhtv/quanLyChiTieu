import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import { Values } from "redux-form-website-template";
import store from "../store/store";
import showResults from "./Form/showResults";
import SimpleForm from "./Form/SimpleForm";

const rootEl = document.getElementById("example");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <SimpleForm onSubmit={showResults} />
      {/* <Values form="simple" /> */}
    </div>
  </Provider>,
  rootEl
);