import { ProductDTO } from "../types";
import productsActions from "./actions";
import productsReducer from "./reducer";

export interface IProductsState {
  product: ProductDTO | null;
  get_product_pending: boolean;
  get_product_error: string | null;
  product_list: Array<ProductDTO> | null;
  get_product_list_pending: boolean;
  get_product_list_error: string | null;
  add_product_pending: boolean;
  add_product_error: string | null;
  edit_product_pending: boolean;
  edit_product_error: string | null;
  delete_product_pending: boolean;
  delete_product_error: string | null;
}

export const ProductsInitialState: IProductsState = {
  product: null,
  get_product_pending: false,
  get_product_error: null,
  product_list: null,
  get_product_list_pending: false,
  get_product_list_error: null,
  add_product_pending: false,
  add_product_error: null,
  edit_product_pending: false,
  edit_product_error: null,
  delete_product_pending: false,
  delete_product_error: null,
};

export enum ProductActionTypes {
  GET_PRODUCT = "GET_PRODUCT",
  GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_FAILED = "GET_PRODUCT_FAILED",
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST",
  GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS",
  GET_PRODUCT_LIST_FAILED = "GET_PRODUCT_LIST_FAILED",
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_FAILED = "ADD_PRODUCT_FAILED",
  EDIT_PRODUCT = "EDIT_PRODUCT",
  EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILED = "EDIT_PRODUCT_FAILED",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED",
}

export const ProductsActions = productsActions;
export const ProductsReducer = productsReducer;
