import { AuthActionTypes, AuthInitialState, AuthStore, IAuthState } from ".";
import { IAction } from "..";

function authReducer(
  state: IAuthState = AuthInitialState,
  action: IAction<any>
): IAuthState {
  switch (action.type) {
    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        register_pending: true,
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        register_pending: false,
      };
    }
    case AuthActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        register_pending: false,
      };
    }
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        login_pending: true,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      const nextState = {
        ...state,
        loginPending: false,
        token: action.payload,
      };
      AuthStore.setLocalStorage(nextState);
      return nextState;
    }
    case AuthActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        login_pending: false,
        token: null,
      };
    }
    case AuthActionTypes.LOGOUT: {
      AuthStore.setLocalStorage(null);
      return {
        ...state,
        token: null,
        login_pending: false,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
