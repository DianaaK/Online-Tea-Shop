import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { AuthStore } from "../../redux/authentication";
import { ProductDTO } from "../../redux/types";
import { ProductsActions } from "../../redux/products";

interface IProps {
  product_list: Array<ProductDTO> | null;
  getProductListAction(): any;
  deleteProductAction(productId: string): any;
  redirectAction(route: string): any;
}

const ProductAdminListComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  useEffect(() => {
    if (!props.product_list) {
      props.getProductListAction();
    }
  }, []);

  const addProduct = () => {
    props.redirectAction("/admin/products/add");
  };

  const editItem = (event: any) => {
    const productId = event.target.getAttribute("id");
    props.redirectAction(`/admin/products/${productId}`);
  };

  const deleteItem = (event: any) => {
    Swal.fire({
      title: "Esti sigur ca vrei sa stergi produsul?",
      showDenyButton: true,
      confirmButtonText: "Sterge",
      denyButtonText: "Renunta",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = event.target.getAttribute("id");
        props.deleteProductAction(productId);
      }
    });
  };

  return (
    <Card
      style={{ maxWidth: "75vw", margin: "auto", padding: 30 }}
      className="custom-card"
    >
      {props.product_list?.length ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nume</th>
                <th>Descriere</th>
                <th>Categorie</th>
                <th>Pret</th>
                <th>In stoc</th>
                <th>Actiuni</th>
              </tr>
            </thead>
            <tbody>
              {props.product_list.map((item: any, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>
                  <td>{item.price} lei</td>
                  <td>{item.isInStock ? "Da" : "Nu"}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <div
                        className="icon"
                        onClick={(event) => {
                          editItem(event);
                        }}
                        id={item.id}
                        style={{ color: "green" }}
                      >
                        <i className="material-icons" id={item.id}>
                          edit
                        </i>
                      </div>
                      <div
                        className="icon"
                        onClick={(event) => {
                          deleteItem(event);
                        }}
                        id={item.id}
                        style={{ color: "red" }}
                      >
                        <i className="material-icons" id={item.id}>
                          delete
                        </i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        "Nu exista produse"
      )}
      <div className="button-container">
        <Button variant="contained" color="success" onClick={addProduct}>
          Adauga produs
        </Button>
      </div>
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    product_list: state.products?.product_list,
  };
}

const dispatchToProps = {
  getProductListAction: ProductsActions.getProductListAction,
  deleteProductAction: ProductsActions.deleteProductAction,
  redirectAction: AuthStore.actions.redirectAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(ProductAdminListComponent)
);
