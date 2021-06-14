import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dragonListReducer from "./store/reducers/dragon-list";
import authReducer from "./store/reducers/auth";
import dragonReducer from "./store/reducers/dragon";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

const rootReducer = combineReducers({
  dragonList: dragonListReducer,
  auth: authReducer,
  dragon: dragonReducer,
});

let composeEnhancers = null;
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
