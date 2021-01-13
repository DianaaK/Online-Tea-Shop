import { Dispatch } from "redux";
import { ProductActionTypes } from ".";
import { ProductDTO } from "../types";
import { Server } from "../../utils";
import Swal from "sweetalert2";

export interface IProductsActions {
  getProductListAction(): any;
  getProductAction(productId: string): any;
  editProductAction(product: ProductDTO): any;
  deleteProductAction(productId: string): any;
}

class ProductsActions implements IProductsActions {
  getProductListAction() {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST,
      });
      Server.get("products/all")
        .then((response: any) => {
          dispatch({
            type: ProductActionTypes.GET_PRODUCT_LIST_SUCCESS,
            payload: response.data as Array<ProductDTO>,
          });
        })
        .catch((error) => {
          Swal.fire({
            text: "Din cauza unei erori, lista nu a putut fi incarcata!",
            timer: 1500,
          });
          dispatch({
            type: ProductActionTypes.GET_PRODUCT_LIST_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  getProductAction(productId: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT,
      });
      Server.get(`products/${productId}`)
        .then((response: any) => {
          dispatch({
            type: ProductActionTypes.GET_PRODUCT_SUCCESS,
            payload: response.data as ProductDTO,
          });
        })
        .catch((error) => {
          dispatch({
            type: ProductActionTypes.GET_PRODUCT_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  editProductAction(product: ProductDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: ProductActionTypes.EDIT_PRODUCT,
      });
      let url = "products/update";
      Server.post(url, product)
        .then(() => {
          dispatch({
            type: ProductActionTypes.EDIT_PRODUCT_SUCCESS,
          });
          // dispatch(productsActions.getProductById(product.id + ""));
          Swal.update({ text: "Produsul a fost actualizat!", icon: "success" });
        })
        .catch((error) => {
          Swal.update({
            text: "Din cauza unei erori, produsul nu a putut fi actualizat!",
            icon: "error",
          });
          dispatch({
            type: ProductActionTypes.EDIT_PRODUCT_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }

  deleteProductAction(productId: string) {
    return (dispatch: Dispatch<any>) => {
      Swal.fire({ text: "Produsul este sters..", timer: 1500 });
      dispatch({
        type: ProductActionTypes.DELETE_PRODUCT,
      });
      let url = `products/${productId}`;
      Server.delete(url)
        .then((response: any) => {
          dispatch({
            type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
            payload: response.data as ProductDTO,
          });
          Swal.update({
            text: "Produsul a fost sters!",
            icon: "success",
          });
        })
        .catch((error) => {
          Swal.update({
            text: "Din cauza unei erori, produsul nu a putut fi sters!",
            icon: "error",
          });
          dispatch({
            type: ProductActionTypes.DELETE_PRODUCT_FAILED,
            payload: Server.errorParse(error),
          });
        });
    };
  }
}

const productsActions = new ProductsActions();
export default productsActions;
