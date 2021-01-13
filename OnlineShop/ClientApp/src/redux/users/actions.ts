import { Dispatch } from "redux";
import { UserActionTypes } from ".";
import { AddressDTO, UserDTO } from "../types";
import { Server } from "../../utils";
import Swal from "sweetalert2";

export interface IUserActions {
  getUserById(userId: string): any;
  editUserAction(user: UserDTO): any;
  editAddressAction(address: AddressDTO, hasData: boolean): any;
}

class UserActions implements IUserActions {
  getUserById(userId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserActionTypes.GET_USER,
      });
      Server.get(`users/${userId}`)
        .then((response: any) => {
          dispatch({
            type: UserActionTypes.GET_USER_SUCCESS,
            payload: response.data as UserDTO,
          });
        })
        .catch((error) => {
          dispatch({
            type: UserActionTypes.GET_USER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  editUserAction(user: UserDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserActionTypes.EDIT_USER,
      });
      Swal.fire({
        text: "Va rugam asteptati!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      Server.post("users/update", user)
        .then(() => {
          Swal.update({ text: "Profilul a fost actualizat!", icon: "success" });
          dispatch({
            type: UserActionTypes.EDIT_USER_SUCCESS,
          });
          dispatch(userActions.getUserById(user.id + ""));
        })
        .catch((error) => {
          Swal.update({
            text: "Din cauza unei erori, profilul nu a putut fi actualizat!",
            icon: "error",
          });
          dispatch({
            type: UserActionTypes.EDIT_USER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  editAddressAction(address: AddressDTO, hasData: boolean = false) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserActionTypes.EDIT_ADDRESS,
      });
      Swal.fire({
        text: "Va rugam asteptati!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      let url = hasData ? "addresses/update" : "addresses/create";
      Server.post(url, address)
        .then(() => {
          dispatch({
            type: UserActionTypes.EDIT_ADDRESS_SUCCESS,
          });
          Swal.update({ text: "Adresa a fost actualizată!", icon: "success" });
          dispatch(userActions.getUserById(address.userId + ""));
        })
        .catch((error) => {
          Swal.update({
            text: "Din cauza unei erori, adresa nu a putut fi actualizata!",
            icon: "error",
          });
          dispatch({
            type: UserActionTypes.EDIT_ADDRESS_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }
}

const userActions = new UserActions();
export default userActions;
