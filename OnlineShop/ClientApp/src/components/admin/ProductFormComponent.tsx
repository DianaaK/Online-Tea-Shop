import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { AppState } from "../../redux";
import TextFieldComponent from "../shared/TextFieldComponent";
import { CategoryDTO, ProductDTO } from "../../redux/types";
import { ProductsActions } from "../../redux/products";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { CategoriesActions } from "../../redux/categories";

interface IProps {
  category_list: Array<CategoryDTO> | null;
  product: ProductDTO | null;
  getProductAction(productId: string): any;
  addProductAction(product: ProductDTO): any;
  editProductAction(product: ProductDTO): any;
  getCategoryListAction(): any;
}

const ProductFormComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  const [product, setProduct] = useState<ProductDTO>(new ProductDTO());

  useEffect(() => {
    if (props.match.params.id) {
      const productId = props.match.params.id;
      props.getProductAction(productId);
    }
    props.getCategoryListAction();
  }, []);

  useEffect(() => {
    if (props.product && props.match.params.id) {
      setProduct(props.product);
    }
  }, [props.product]);

  const editProductHandler = () => {
    if (product && props.match.params.id) {
      props.editProductAction(product);
    } else if (product) {
      delete product.category;
      props.addProductAction(product);
    }
  };

  const changeInStock = (event: any) => {
    const isInStock = event.target.value === "true";
    setProduct({ ...product, isInStock });
  };

  const changeCategory = (event: any) => {
    const categoryId = event.target.value;
    const category = props.category_list?.find(
      (item: CategoryDTO) => item.id === categoryId
    );
    setProduct({ ...product, categoryId, category });
  };

  return (
    <Card
      style={{ width: 800, margin: "auto", padding: 30 }}
      className="custom-card"
    >
      <div className="form-group" style={{ marginLeft: 20 }}>
        <TextFieldComponent
          id="name"
          inType="text"
          label="Nume"
          onChange={(event: any) =>
            setProduct({ ...product, name: event.target.value })
          }
          value={product.name || ""}
        />
      </div>
      <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
        <TextFieldComponent
          id="description"
          inType="textarea"
          label="Descriere"
          onChange={(event: any) =>
            setProduct({ ...product, description: event.target.value })
          }
          value={product.description || ""}
        />
      </div>
      <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
        <TextFieldComponent
          id="price"
          inType="text"
          label="Pret"
          onChange={(event: any) =>
            setProduct({ ...product, price: event.target.value })
          }
          value={product.price || ""}
        />
      </div>
      <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
        <TextFieldComponent
          id="imageUrl"
          inType="text"
          label="Link imagine"
          onChange={(event: any) =>
            setProduct({ ...product, imageUrl: event.target.value })
          }
          value={product.imageUrl || ""}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
          <FormControl>
            <InputLabel id="stock">Stoc</InputLabel>
            <Select
              labelId="stock"
              id="stock"
              value={
                product.isInStock !== undefined ? product.isInStock + "" : ""
              }
              onChange={changeInStock}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              style={{ width: 130 }}
            >
              <MenuItem value={"true"}>In stoc</MenuItem>
              <MenuItem value={"false"}>Nu e in stoc</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
          <FormControl>
            <InputLabel id="category">Categorie</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={product.categoryId ? product.categoryId : ""}
              onChange={changeCategory}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              style={{ width: 140 }}
            >
              {props.category_list?.map((item: CategoryDTO) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="button-container">
        <Button
          variant="contained"
          color="success"
          onClick={editProductHandler}
        >
          Salveaza produs
        </Button>
      </div>
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    product: state.products.product,
    category_list: state.categories?.category_list,
  };
}

const dispatchToProps = {
  getProductAction: ProductsActions.getProductAction,
  addProductAction: ProductsActions.addProductAction,
  editProductAction: ProductsActions.editProductAction,
  getCategoryListAction: CategoriesActions.getCategoryListAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(ProductFormComponent)
);
