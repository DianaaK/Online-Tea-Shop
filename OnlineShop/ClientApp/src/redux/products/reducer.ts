import { IProductsState, ProductActionTypes, ProductsInitialState } from ".";
import { IAction } from "..";

function productsReducer(
  state: IProductsState = ProductsInitialState,
  action: IAction<any>
): IProductsState {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCT: {
      return {
        ...state,
        get_product_pending: true,
        get_product_error: null,
      };
    }
    case ProductActionTypes.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        get_product_pending: false,
        get_product_error: null,
        product: action.payload,
      };
    }
    case ProductActionTypes.GET_PRODUCT_FAILED: {
      return {
        ...state,
        get_product_pending: false,
        get_product_error: action.payload,
        product: null,
      };
    }
    case ProductActionTypes.GET_PRODUCT_LIST: {
      return {
        ...state,
        get_product_list_pending: true,
        get_product_list_error: null,
      };
    }
    case ProductActionTypes.GET_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        get_product_list_pending: false,
        get_product_list_error: null,
        product_list: action.payload,
      };
    }
    case ProductActionTypes.GET_PRODUCT_LIST_FAILED: {
      return {
        ...state,
        get_product_list_pending: false,
        get_product_list_error: action.payload,
        product_list: [],
      };
    }
    case ProductActionTypes.ADD_PRODUCT: {
      return {
        ...state,
        add_product_pending: true,
        add_product_error: null,
      };
    }
    case ProductActionTypes.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        add_product_pending: false,
        add_product_error: null,
      };
    }
    case ProductActionTypes.ADD_PRODUCT_FAILED: {
      return {
        ...state,
        add_product_pending: false,
        add_product_error: action.payload,
      };
    }
    case ProductActionTypes.EDIT_PRODUCT: {
      return {
        ...state,
        edit_product_pending: true,
        edit_product_error: null,
      };
    }
    case ProductActionTypes.EDIT_PRODUCT_SUCCESS: {
      return {
        ...state,
        edit_product_pending: false,
        edit_product_error: null,
      };
    }
    case ProductActionTypes.EDIT_PRODUCT_FAILED: {
      return {
        ...state,
        edit_product_pending: false,
        edit_product_error: action.payload,
      };
    }
    case ProductActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        delete_product_pending: true,
        delete_product_error: null,
      };
    }
    case ProductActionTypes.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        delete_product_pending: false,
        delete_product_error: null,
      };
    }
    case ProductActionTypes.DELETE_PRODUCT_FAILED: {
      return {
        ...state,
        delete_product_pending: false,
        delete_product_error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default productsReducer;
