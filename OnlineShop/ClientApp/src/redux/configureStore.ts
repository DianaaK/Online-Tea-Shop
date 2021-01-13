import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { defaultReducer, history } from "./";

/*
  Redux store creation and Redux Devtools Extension Setup
*/
const routerMid = routerMiddleware(history);

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  defaultReducer,
  composeEnhancer(applyMiddleware(thunk, routerMid))
);

export { history };
