import { OrderDTO } from "../types";
import ordersActions from "./actions";
import ordersReducer from "./reducer";

export interface IOrdersState {
  cart: OrderDTO | null;
  get_cart_pending: boolean;
  get_cart_error: string | null;
  order: OrderDTO | null;
  get_order_pending: boolean;
  get_order_error: string | null;
  order_list: Array<OrderDTO> | null;
  get_order_list_pending: boolean;
  get_order_list_error: string | null;

  user_order_list: Array<OrderDTO> | null;
  get_orders_user_pending: boolean;
  get_orders_user_error: string | null;
  edit_order_pending: boolean;
  edit_order_error: string | null;
  delete_order: boolean;
  delete_order_pending: boolean;
  delete_order_error: string | null;
  create_order_pending: boolean;
  create_order_error: string | null;
  add_item_order_pending: boolean;
  add_item_order_error: string | null;
}

export const OrdersInitialState: IOrdersState = {
  cart: null,
  get_cart_pending: false,
  get_cart_error: null,
  order: null,
  get_order_pending: false,
  get_order_error: null,
  order_list: null,
  get_order_list_pending: false,
  get_order_list_error: null,
  user_order_list: null,
  get_orders_user_pending: false,
  get_orders_user_error: null,
  edit_order_pending: false,
  edit_order_error: null,
  delete_order: false,
  delete_order_pending: false,
  delete_order_error: null,
  create_order_pending: false,
  create_order_error: null,
  add_item_order_pending: false,
  add_item_order_error: null,
};

export enum OrderActionTypes {
  GET_CART = "GET_CART",
  GET_CART_SUCCESS = "GET_CART_SUCCESS",
  GET_CART_FAILED = "GET_CART_FAILED",
  GET_ORDER = "GET_ORDER",
  GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS",
  GET_ORDER_FAILED = "GET_ORDER_FAILED",
  GET_ORDER_LIST = "GET_ORDER_LIST",
  GET_ORDERS_USER = "GET_ORDERS_USER",
  GET_ORDERS_USER_SUCCESS = "GET_ORDERS_USER_SUCCESS",
  GET_ORDERS_USER_FAILED = "GET_ORDERS_USER_FAILED",
  GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS",
  GET_ORDER_LIST_FAILED = "GET_ORDER_LIST_FAILED",
  EDIT_ORDER = "EDIT_ORDER",
  EDIT_ORDER_SUCCESS = "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAILED = "EDIT_ORDER_FAILED",
  DELETE_ORDER = "DELETE_ORDER",
  DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILED = "DELETE_ORDER_FAILED",
  CREATE_ORDER = "CREATE_ORDER",
  CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED",
  ADD_ITEM_ORDER = "ADD_ITEM_ORDER",
  ADD_ITEM_ORDER_SUCCESS = "ADD_ITEM_ORDER_SUCCESS",
  ADD_ITEM_ORDER_FAILED = "ADD_ITEM_ORDER_FAILED",
  DELETE_ITEM_ORDER = "DELETE_ITEM_ORDER",
  DELETE_ITEM_ORDER_SUCCESS = "DELETE_ITEM_ORDER_SUCCESS",
  DELETE_ITEM_ORDER_FAILED = "DELETE_ITEM_ORDER_FAILED",
}

export const OrdersActions = ordersActions;
export const OrdersReducer = ordersReducer;
