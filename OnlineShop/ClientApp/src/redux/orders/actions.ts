import { Dispatch } from "redux";
import { OrderActionTypes } from ".";
import { OrderDTO } from "../types";
import { Server } from "../../utils";
import Swal from "sweetalert2";

export interface IOrdersActions {
  createOrderAction(order: OrderDTO): any;
  getOrderListAction(): any;
  getOrderAction(orderId: string): any;
  editOrderAction(order: OrderDTO): any;
  deleteOrderAction(orderId: string): any;
  addItemToOrderAction(orderId: number, productId: number): any;
  getCartOrder(userId: string): any;
}

class OrdersActions implements IOrdersActions {
  createOrderAction(order: OrderDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.CREATE_ORDER,
      });
      Server.post("orders/create", order)
        .then(() => {
          dispatch({
            type: OrderActionTypes.CREATE_ORDER_SUCCESS,
          });
        })
        .catch((error) => {
          dispatch({
            type: OrderActionTypes.CREATE_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getOrderListAction() {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.GET_ORDER_LIST,
      });
      Server.get("orders/all")
        .then((response: any) => {
          dispatch({
            type: OrderActionTypes.GET_ORDER_LIST_SUCCESS,
            payload: response.data as Array<OrderDTO>,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, lista nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: OrderActionTypes.GET_ORDER_LIST_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getOrdersForUserAction(userId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.GET_ORDERS_USER,
      });
      Server.get(`orders/all/${userId}`)
        .then((response: any) => {
          dispatch({
            type: OrderActionTypes.GET_ORDERS_USER_SUCCESS,
            payload: response.data as Array<OrderDTO>,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, lista nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: OrderActionTypes.GET_ORDERS_USER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getOrderAction(orderId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.GET_ORDER,
      });
      Server.get(`orders/${orderId}`)
        .then((response: any) => {
          dispatch({
            type: OrderActionTypes.GET_ORDER_SUCCESS,
            payload: response.data as OrderDTO,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, comanda nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: OrderActionTypes.GET_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  editOrderAction(order: OrderDTO, isCart?: boolean) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.EDIT_ORDER,
      });
      Server.post("orders/update", order)
        .then(() => {
          dispatch({
            type: OrderActionTypes.EDIT_ORDER_SUCCESS,
            payload: isCart,
          });
          if (!isCart) {
            Swal.fire({
              text: "Comanda a fost editata!",
              icon: "success",
            });
          }
          dispatch(ordersActions.getOrderListAction());
        })
        .catch((error) => {
          dispatch({
            type: OrderActionTypes.EDIT_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  deleteOrderAction(orderId: string) {
    return (dispatch: Dispatch<any>) => {
      Swal.fire({ text: "Comanda este stearsa..", timer: 1500 });
      dispatch({
        type: OrderActionTypes.DELETE_ORDER,
      });
      let url = `orders/${orderId}`;
      Server.delete(url)
        .then(() => {
          dispatch({
            type: OrderActionTypes.DELETE_ORDER_SUCCESS,
          });
          Swal.update({
            text: "Comanda a fost stearsa!",
            icon: "success",
          });
          dispatch(ordersActions.getOrderListAction());
        })
        .catch((error) => {
          Swal.update({
            text: "Din cauza unei erori, comanda nu a putut fi stearsa!",
            icon: "error",
          });
          dispatch({
            type: OrderActionTypes.DELETE_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getCartOrder(userId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.GET_CART,
      });
      Server.get(`orders/active/${userId}`)
        .then((response: any) => {
          dispatch({
            type: OrderActionTypes.GET_CART_SUCCESS,
            payload: response.data as OrderDTO,
          });
        })
        .catch((error) => {
          dispatch({
            type: OrderActionTypes.GET_CART_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  addItemToOrderAction(orderId: number, productId: number) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.ADD_ITEM_ORDER,
      });
      Server.post(`orders/order-product`, { orderId, productId })
        .then(() => {
          dispatch({
            type: OrderActionTypes.ADD_ITEM_ORDER_SUCCESS,
          });
          Swal.fire({
            text: "Produsul a fost adaugat in cos!",
            icon: "success",
          });
          dispatch(ordersActions.getOrderAction(orderId + ""));
        })
        .catch((error) => {
          dispatch({
            type: OrderActionTypes.ADD_ITEM_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  deleteItemFromOrderAction(orderId: number, productId: number) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: OrderActionTypes.DELETE_ITEM_ORDER,
      });
      Server.delete(`orders/delete-order-product`, { orderId, productId })
        .then(() => {
          dispatch({
            type: OrderActionTypes.DELETE_ITEM_ORDER_SUCCESS,
          });
          dispatch(ordersActions.getOrderAction(orderId + ""));
        })
        .catch((error) => {
          dispatch({
            type: OrderActionTypes.DELETE_ITEM_ORDER_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }
}

const ordersActions = new OrdersActions();
export default ordersActions;
