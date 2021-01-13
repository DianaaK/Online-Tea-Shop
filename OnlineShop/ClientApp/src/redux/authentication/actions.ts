import { push } from "connected-react-router";
import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { AuthActionTypes, AuthStore } from "./";
import { AuthUtils, Server } from "../../utils";
import { UserActions } from "../users";
import { UserDTO } from "../types";
import { OrdersActions } from "../orders";

export interface IAuthActions {
  redirectAction(route: string): any;
  loginAction(Email: string, Password: string): any;
  logoutAction(): any;
  registerAction(user: UserDTO): any;
}

class authActions implements IAuthActions {
  redirectAction(route: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch(push(route));
    };
  }

  loginAction(Email: string, Password: string) {
    Swal.fire({
      text: "Va rugam asteptati!",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthActionTypes.LOGIN,
      });
      return Server.login(Email, Password)
        .then((response: any) => {
          dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: response,
          });
          if (AuthUtils.isUser() || AuthUtils.isAdmin()) {
            dispatch(AuthActions.redirectAction(`/profile/${response.id}`));
            dispatch(UserActions.getUserById(response.id));
            dispatch(OrdersActions.getCartOrder(response.id));
          }
        })
        .catch((error) => {
          Swal.update({
            text: "A aparut o eroare! Va rugam reincercati",
            icon: "error",
          });
          dispatch({
            type: AuthActionTypes.LOGIN_FAILED,
            payload: error,
          });
        });
    };
  }

  logoutAction() {
    return (dispatch: Dispatch<any>) => {
      dispatch({ type: AuthActionTypes.LOGOUT });
      dispatch(AuthActions.redirectAction("/"));
    };
  }

  registerAction(user: UserDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthActionTypes.REGISTER,
      });
      Server.post("auth/register", user)
        .then((status: any) => {
          dispatch({
            type: AuthActionTypes.REGISTER_SUCCESS,
            payload: status,
          });
          Swal.update({
            text: "Profilul a fost actualizat!",
            icon: "success",
          });
          dispatch(AuthStore.actions.loginAction(user.email, user.password));
        })
        .catch((error: any) => {
          Swal.update({
            text: "A aparut o eroare! Va rugam reincercati!",
            icon: "error",
          });
          dispatch({
            type: AuthActionTypes.REGISTER_FAILED,
            payload: error,
          });
        });
    };
  }
}

const AuthActions = new authActions();
export default AuthActions;
