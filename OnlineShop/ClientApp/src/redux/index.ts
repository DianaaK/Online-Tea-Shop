import { Reducer, combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { AuthStore, IAuthState } from "./authentication";
import { createBrowserHistory } from "history";
import { IProductsState, ProductsReducer } from "./products";
import { IUserState, UsersReducer } from "./users";
import { IOrdersState, OrdersReducer } from "./orders";

export const history = createBrowserHistory();

/*
  Combination of all Reducers
*/
export const rootReducer: Reducer<any> = combineReducers({
  auth: AuthStore.reducer,
  orders: OrdersReducer,
  products: ProductsReducer,
  users: UsersReducer,
  router: connectRouter(history),
});

export const defaultReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    state.auth = null;
    state.users = null;
  }
  return rootReducer(state, action);
};

/*
  Creation of AppState interface that contains all the individual Redux states
*/
export interface AppState {
  auth: IAuthState;
  orders: IOrdersState;
  products: IProductsState;
  users: IUserState;
}

export interface IAction<P> {
  type: string;
  payload: P;
  error?: boolean;
  meta?: Object;
}
