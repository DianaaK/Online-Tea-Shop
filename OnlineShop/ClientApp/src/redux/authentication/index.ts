import AuthActions from "./actions";
import authReducer from "./reducer";

export interface IAuthState {
  login_pending: boolean;
  login_error: string | null;
  register_pending: boolean;
  register_error: string | null;
  token: string | null;
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILED = "REGISTER_FAILED",
}

export const AuthStore = {
  getInitialState: function () {
    const authLocalStorage = localStorage.getItem("auth");
    if (authLocalStorage === null || authLocalStorage === undefined) {
      return {
        login_pending: false,
        login_error: null,
        register_pending: false,
        register_error: null,
        token: null,
      };
    } else {
      return JSON.parse(authLocalStorage);
    }
  },

  setLocalStorage: function (state: IAuthState | null) {
    if (state !== null) {
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(state));
    } else {
      localStorage.removeItem("auth");
    }
  },

  actions: AuthActions,
  reducer: authReducer,
};

export const AuthInitialState = AuthStore.getInitialState();
