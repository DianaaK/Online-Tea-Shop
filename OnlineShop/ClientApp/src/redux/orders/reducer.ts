import { IOrdersState, OrderActionTypes, OrdersInitialState } from ".";
import { IAction } from "..";
import { OrderStatus } from "../types";

function ordersReducer(
  state: IOrdersState = OrdersInitialState,
  action: IAction<any>
): IOrdersState {
  switch (action.type) {
    case OrderActionTypes.GET_ORDER: {
      return {
        ...state,
        get_order_pending: true,
        get_order_error: null,
      };
    }
    case OrderActionTypes.GET_ORDER_SUCCESS: {
      if (action.payload.id === state.cart?.id)
        return {
          ...state,
          get_order_pending: false,
          get_order_error: null,
          cart: action.payload,
        };
      return {
        ...state,
        get_order_pending: false,
        get_order_error: null,
        order: action.payload,
      };
    }
    case OrderActionTypes.GET_ORDER_FAILED: {
      return {
        ...state,
        get_order_pending: false,
        get_order_error: action.payload,
      };
    }
    case OrderActionTypes.GET_ORDER_LIST: {
      return {
        ...state,
        get_order_list_pending: true,
        get_order_list_error: null,
      };
    }
    case OrderActionTypes.GET_ORDER_LIST_SUCCESS: {
      return {
        ...state,
        get_order_list_pending: false,
        get_order_list_error: null,
        order_list: action.payload,
      };
    }
    case OrderActionTypes.GET_ORDER_LIST_FAILED: {
      return {
        ...state,
        get_order_list_pending: false,
        get_order_list_error: action.payload,
      };
    }
    case OrderActionTypes.GET_ORDERS_USER: {
      return {
        ...state,
        get_orders_user_pending: true,
        get_orders_user_error: null,
      };
    }
    case OrderActionTypes.GET_ORDERS_USER_SUCCESS: {
      return {
        ...state,
        get_orders_user_pending: false,
        get_orders_user_error: null,
        user_order_list: action.payload,
      };
    }
    case OrderActionTypes.GET_ORDERS_USER_FAILED: {
      return {
        ...state,
        get_orders_user_pending: false,
        get_orders_user_error: action.payload,
      };
    }
    case OrderActionTypes.EDIT_ORDER: {
      return {
        ...state,
        edit_order_pending: true,
        edit_order_error: null,
      };
    }
    case OrderActionTypes.EDIT_ORDER_SUCCESS: {
      if (action.payload) {
        return {
          ...state,
          cart: null,
          edit_order_pending: false,
          edit_order_error: null,
        };
      }
      return {
        ...state,
        edit_order_pending: false,
        edit_order_error: null,
      };
    }
    case OrderActionTypes.EDIT_ORDER_FAILED: {
      return {
        ...state,
        edit_order_pending: false,
        edit_order_error: action.payload,
      };
    }
    case OrderActionTypes.DELETE_ORDER: {
      return {
        ...state,
        delete_order_pending: true,
        delete_order_error: null,
      };
    }
    case OrderActionTypes.DELETE_ORDER_SUCCESS: {
      return {
        ...state,
        delete_order_pending: false,
        delete_order_error: null,
      };
    }
    case OrderActionTypes.DELETE_ORDER_FAILED: {
      return {
        ...state,
        delete_order_pending: false,
        delete_order_error: action.payload,
      };
    }
    case OrderActionTypes.GET_CART: {
      return {
        ...state,
        get_cart_pending: true,
        get_cart_error: null,
      };
    }
    case OrderActionTypes.GET_CART_SUCCESS: {
      return {
        ...state,
        get_cart_pending: false,
        get_cart_error: null,
        cart: action.payload,
      };
    }
    case OrderActionTypes.GET_CART_FAILED: {
      return {
        ...state,
        get_cart_pending: false,
        get_cart_error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default ordersReducer;
