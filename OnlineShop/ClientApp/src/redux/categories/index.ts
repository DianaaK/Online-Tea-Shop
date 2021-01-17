import { CategoryDTO, ProductDTO } from "../types";
import categoriesActions from "./actions";
import categoriesReducer from "./reducer";

export interface ICategoriesState {
  category: CategoryDTO | null;
  get_category_pending: boolean;
  get_category_error: string | null;
  category_list: Array<ProductDTO> | null;
  get_category_list_pending: boolean;
  get_category_list_error: string | null;
  add_category_pending: boolean;
  add_category_error: string | null;
  edit_category_pending: boolean;
  edit_category_error: string | null;
  delete_category_pending: boolean;
  delete_category_error: string | null;
}

export const CategoriesInitialState: ICategoriesState = {
  category: null,
  get_category_pending: false,
  get_category_error: null,
  category_list: null,
  get_category_list_pending: false,
  get_category_list_error: null,
  edit_category_pending: false,
  edit_category_error: null,
  add_category_pending: false,
  add_category_error: null,
  delete_category_pending: false,
  delete_category_error: null,
};

export enum CategoryActionTypes {
  GET_CATEGORY = "GET_CATEGORY",
  GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_FAILED = "GET_CATEGORY_FAILED",
  GET_CATEGORY_LIST = "GET_CATEGORY_LIST",
  GET_CATEGORY_LIST_SUCCESS = "GET_CATEGORY_LIST_SUCCESS",
  GET_CATEGORY_LIST_FAILED = "GET_CATEGORY_LIST_FAILED",
  ADD_CATEGORY = "ADD_CATEGORY",
  ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS",
  ADD_CATEGORY_FAILED = "ADD_CATEGORY_FAILED",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS",
  EDIT_CATEGORY_FAILED = "EDIT_CATEGORY_FAILED",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED",
}

export const CategoriesActions = categoriesActions;
export const CategoriesReducer = categoriesReducer;
