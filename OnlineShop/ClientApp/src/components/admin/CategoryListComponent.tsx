import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { AuthStore } from "../../redux/authentication";
import { CategoryDTO } from "../../redux/types";
import { CategoriesActions } from "../../redux/categories";

interface IProps {
  category_list: Array<CategoryDTO> | null;
  getCategoryListAction(): any;
  deleteCategoryAction(productId: string): any;
  redirectAction(route: string): any;
}

const CategoryListComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  useEffect(() => {
    if (!props.category_list) {
      props.getCategoryListAction();
    }
  }, []);

  const addCategory = () => {
    props.redirectAction("/admin/categories/add");
  };

  const editItem = (event: any) => {
    const categoryId = event.target.getAttribute("id");
    props.redirectAction(`/admin/categories/${categoryId}`);
  };

  const deleteItem = (event: any) => {
    Swal.fire({
      title: "Esti sigur ca vrei sa stergi categoria?",
      showDenyButton: true,
      confirmButtonText: "Sterge",
      denyButtonText: "Renunta",
    }).then((result) => {
      if (result.isConfirmed) {
        const categoryId = event.target.getAttribute("id");
        props.deleteCategoryAction(categoryId);
      }
    });
  };

  return (
    <Card
      style={{ maxWidth: "75vw", margin: "auto", padding: 30 }}
      className="custom-card"
    >
      {props.category_list?.length ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nume</th>
                <th>Descriere</th>
                <th>Actiuni</th>
              </tr>
            </thead>
            <tbody>
              {props.category_list.map((item: any, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <div
                        className="icon"
                        onClick={editItem}
                        id={item.id}
                        style={{ color: "green" }}
                      >
                        <i className="material-icons" id={item.id}>
                          edit
                        </i>
                      </div>
                      <div
                        className="icon"
                        onClick={deleteItem}
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
        "Nu exista categorii"
      )}
      <div className="button-container">
        <Button variant="contained" color="success" onClick={addCategory}>
          Adauga categorie
        </Button>
      </div>
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    category_list: state.categories?.category_list,
  };
}

const dispatchToProps = {
  getCategoryListAction: CategoriesActions.getCategoryListAction,
  deleteCategoryAction: CategoriesActions.deleteCategoryAction,
  redirectAction: AuthStore.actions.redirectAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(CategoryListComponent)
);
