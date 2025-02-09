import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { AppState } from "../../redux";
import AuthActions from "../../redux/authentication/actions";
import { ProductsActions } from "../../redux/products";
import { ProductDTO } from "../../redux/types";
import ProductItem from "./ProductItem";

interface IProps {
  product_list: Array<ProductDTO> | null;
  getProductListAction(): any;
  getProductAction(productId: string): any;
  redirectAction(path: string): any;
}

const ProductsListComponent = (props: IProps) => {
  useEffect(() => {
    props.getProductListAction();
  }, []);

  const onDetailsClick = (event: any) => {
    const productId = event.target.id;
    props.getProductAction(productId);
    props.redirectAction(`/products/${productId}`);
  };

  return (
    <div style={{ ...styles.container, flexWrap: "wrap" }}>
      {props.product_list
        ? props.product_list.map((item: ProductDTO) => (
            <div key={item.id} style={styles.card}>
              <ProductItem product={item} onClick={onDetailsClick} />
            </div>
          ))
        : "Din pacate nu au fost gasite rezultate"}
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {
    product_list: state.products?.product_list,
  };
}

const dispatchToProps = {
  getProductListAction: ProductsActions.getProductListAction,
  getProductAction: ProductsActions.getProductAction,
  redirectAction: AuthActions.redirectAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(ProductsListComponent)
);

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    width: 470,
    margin: "20px 10px",
  },
};
