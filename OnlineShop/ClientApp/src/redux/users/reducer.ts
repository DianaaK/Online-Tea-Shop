import { IUserState, UserActionTypes, UserInitialState } from ".";
import { IAction } from "..";

function usersReducer(
  state: IUserState = UserInitialState,
  action: IAction<any>
): IUserState {
  switch (action.type) {
    case UserActionTypes.GET_USER: {
      return {
        ...state,
        get_user_pending: true,
        get_user_error: null,
      };
    }
    case UserActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        get_user_pending: false,
        get_user_error: null,
      };
    }
    case UserActionTypes.GET_USER_FAILED: {
      return {
        ...state,
        user: null,
        get_user_pending: false,
        get_user_error: action.payload,
      };
    }
    case UserActionTypes.EDIT_USER: {
      return {
        ...state,
        edit_user_pending: true,
        edit_user_error: null,
      };
    }
    case UserActionTypes.EDIT_USER_SUCCESS: {
      return {
        ...state,
        edit_user_pending: false,
        edit_user_error: null,
      };
    }
    case UserActionTypes.EDIT_USER_FAILED: {
      return {
        ...state,
        edit_user_pending: false,
        edit_user_error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default usersReducer;
