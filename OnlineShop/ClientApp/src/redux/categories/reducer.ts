import {
  ICategoriesState,
  CategoryActionTypes,
  CategoriesInitialState,
} from ".";
import { IAction } from "..";

function categoriesReducer(
  state: ICategoriesState = CategoriesInitialState,
  action: IAction<any>
): ICategoriesState {
  switch (action.type) {
    case CategoryActionTypes.GET_CATEGORY: {
      return {
        ...state,
        get_category_pending: true,
        get_category_error: null,
      };
    }
    case CategoryActionTypes.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        get_category_pending: false,
        get_category_error: null,
        category: action.payload,
      };
    }
    case CategoryActionTypes.GET_CATEGORY_FAILED: {
      return {
        ...state,
        get_category_pending: false,
        get_category_error: action.payload,
        category: null,
      };
    }
    case CategoryActionTypes.GET_CATEGORY_LIST: {
      return {
        ...state,
        get_category_list_pending: true,
        get_category_list_error: null,
      };
    }
    case CategoryActionTypes.GET_CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        get_category_list_pending: false,
        get_category_list_error: null,
        category_list: action.payload,
      };
    }
    case CategoryActionTypes.GET_CATEGORY_LIST_FAILED: {
      return {
        ...state,
        get_category_list_pending: false,
        get_category_list_error: action.payload,
        category_list: [],
      };
    }
    case CategoryActionTypes.EDIT_CATEGORY: {
      return {
        ...state,
        edit_category_pending: true,
        edit_category_error: null,
      };
    }
    case CategoryActionTypes.EDIT_CATEGORY_SUCCESS: {
      return {
        ...state,
        edit_category_pending: false,
        edit_category_error: null,
      };
    }
    case CategoryActionTypes.EDIT_CATEGORY_FAILED: {
      return {
        ...state,
        edit_category_pending: false,
        edit_category_error: action.payload,
      };
    }
    case CategoryActionTypes.ADD_CATEGORY: {
      return {
        ...state,
        add_category_pending: true,
        add_category_error: null,
      };
    }
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        add_category_pending: false,
        add_category_error: null,
      };
    }
    case CategoryActionTypes.ADD_CATEGORY_FAILED: {
      return {
        ...state,
        add_category_pending: false,
        add_category_error: action.payload,
      };
    }
    case CategoryActionTypes.DELETE_CATEGORY: {
      return {
        ...state,
        delete_category_pending: true,
        delete_category_error: null,
      };
    }
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        delete_category_pending: false,
        delete_category_error: null,
      };
    }
    case CategoryActionTypes.DELETE_CATEGORY_FAILED: {
      return {
        ...state,
        delete_category_pending: false,
        delete_category_error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default categoriesReducer;
