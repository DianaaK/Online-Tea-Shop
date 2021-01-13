import { UserDTO } from "../types";
import userActions from "./actions";
import usersReducer from "./reducer";

export interface IUserState {
  user: UserDTO | null;
  get_user_pending: boolean;
  get_user_error: string | null;
  edit_user_pending: boolean;
  edit_user_error: string | null;
  edit_address_pending: boolean;
  edit_address_error: string | null;
}

export const UserInitialState: IUserState = {
  user: null,
  get_user_pending: false,
  get_user_error: null,
  edit_user_pending: false,
  edit_user_error: null,
  edit_address_pending: false,
  edit_address_error: null,
};

export enum UserActionTypes {
  GET_USER = "GET_USER",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILED = "GET_USER_FAILED",
  EDIT_USER = "EDIT_USER",
  EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED = "EDIT_USER_FAILED",
  EDIT_ADDRESS = "EDIT_ADDRESS",
  EDIT_ADDRESS_SUCCESS = "EDIT_ADDRESS_SUCCESS",
  EDIT_ADDRESS_FAILED = "EDIT_ADDRESS_FAILED",
}

export const UserActions = userActions;
export const UsersReducer = usersReducer;
