import { Dispatch } from "redux";
import { CategoryActionTypes } from ".";
import { CategoryDTO } from "../types";
import { Server } from "../../utils";
import Swal from "sweetalert2";
import { AuthStore } from "../authentication";

export interface ICategoriesActions {
  getCategoryListAction(): any;
  getCategoryAction(categoryId: string): any;
  addCategoryAction(category: CategoryDTO): any;
  editCategoryAction(category: CategoryDTO): any;
  deleteCategoryAction(categoryId: string): any;
}

class CategoriesActions implements ICategoriesActions {
  getCategoryListAction() {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: CategoryActionTypes.GET_CATEGORY_LIST,
      });
      Server.get("categories/all")
        .then((response: any) => {
          dispatch({
            type: CategoryActionTypes.GET_CATEGORY_LIST_SUCCESS,
            payload: response.data as Array<CategoryDTO>,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, lista nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: CategoryActionTypes.GET_CATEGORY_LIST_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getCategoryAction(categoryId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: CategoryActionTypes.GET_CATEGORY,
      });
      Server.get(`categories/${categoryId}`)
        .then((response: any) => {
          dispatch({
            type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
            payload: response.data as CategoryDTO,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, categoria nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: CategoryActionTypes.GET_CATEGORY_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  addCategoryAction(category: CategoryDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: CategoryActionTypes.ADD_CATEGORY,
      });
      Server.post("categories/create", category)
        .then(() => {
          dispatch({
            type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
          });
          Swal.fire({
            text: "Categoria a fost creata!",
            icon: "success",
          });
          dispatch(categoriesActions.getCategoryListAction());
          dispatch(AuthStore.actions.redirectAction("/admin/categories"));
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, categoria nu a putut fi creata!",
            icon: "error",
          });
          dispatch({
            type: CategoryActionTypes.ADD_CATEGORY_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  editCategoryAction(category: CategoryDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: CategoryActionTypes.EDIT_CATEGORY,
      });
      Server.post("categories/update", category)
        .then(() => {
          dispatch({
            type: CategoryActionTypes.EDIT_CATEGORY_SUCCESS,
          });
          Swal.fire({
            text: "Categoria a fost actualizata!",
            icon: "success",
          });
          dispatch(categoriesActions.getCategoryListAction());
          dispatch(AuthStore.actions.redirectAction("/admin/categories"));
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, categoria nu a putut fi actualizata!",
            icon: "error",
          });
          dispatch({
            type: CategoryActionTypes.EDIT_CATEGORY_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  deleteCategoryAction(categoryId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: CategoryActionTypes.DELETE_CATEGORY,
      });
      let url = `categories/${categoryId}`;
      Server.delete(url)
        .then(() => {
          dispatch({
            type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS,
          });
          Swal.fire({
            text: "Categoria a fost stearsa!",
            icon: "success",
          });
          dispatch(categoriesActions.getCategoryListAction());
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, categoria nu a putut fi stearsa!",
            icon: "error",
          });
          dispatch({
            type: CategoryActionTypes.DELETE_CATEGORY_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }
}

const categoriesActions = new CategoriesActions();
export default categoriesActions;
