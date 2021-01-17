import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Card, Button } from "reactstrap";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { OrdersActions } from "../../redux/orders";
import { ProductsActions } from "../../redux/products";
import { OrderDTO, ProductDTO, UserDTO } from "../../redux/types";
import placeholder from "../../assets/images/placeholder.jpg";

interface IProps {
  user: UserDTO | null;
  product: ProductDTO | null;
  cart: OrderDTO | null;
  getProductAction(productId: string): any;
  createOrderAction(order: OrderDTO): any;
  addItemToOrderAction(orderId: number, productId: number): any;
}

const ProductViewComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  useEffect(() => {
    if (!props.product) {
      const productId = props.match.params.id;
      props.getProductAction(productId);
    }
  }, []);

  const addToCart = () => {
    if (!props.user) {
      Swal.fire({
        text: "Trebuie sa va logati pentru a adauga produsul in cos",
        icon: "warning",
        showConfirmButton: true,
      });
    } else if (props.cart?.id && props.product?.id) {
      props.addItemToOrderAction(props.cart.id, props.product.id);
    }
  };

  return (
    <>
      <Card style={styles.productCard} className="custom-card">
        {props.product ? (
          <div style={{ ...styles.container, position: "relative" }}>
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${
                  props.product.imageUrl ? props.product.imageUrl : placeholder
                })`,
              }}
            />
            <div
              style={{ ...styles.productCardContent, flexDirection: "column" }}
            >
              <div className="product-title" style={{ fontSize: 22 }}>
                {props.product.name}
              </div>
              <div
                className="product-category"
                style={{ marginTop: -40, marginLeft: 170 }}
              >
                {props.product.category?.name}
              </div>
              <div
                className="product-description"
                style={{ fontSize: 16, height: "initial" }}
              >
                {props.product.description}
              </div>
              <div className="product-price">{props.product.price} RON</div>
              <div>
                <div
                  style={{
                    color: props.product.isInStock ? "#3f9168" : "#9c5454",
                    margin: 10,
                  }}
                >
                  {props.product.isInStock ? "In stoc" : "Stoc epuizat"}
                </div>
                {props.product.isInStock ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={addToCart}
                  >
                    Adauga in cos
                  </Button>
                ) : (
                  <Button variant="contained" color="danger" disabled>
                    Adauga in cos
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          "Nu a fost gasit produsul"
        )}
      </Card>
      <Card style={styles.categoryCard} className="custom-card">
        {props.product?.category ? (
          <>
            <div
              className="product-title"
              style={{ fontSize: 20, lineHeight: "1.9em" }}
            >
              Despre{" "}
              <span style={{ fontWeight: 600 }}>
                {props.product?.category.name}
              </span>
            </div>
            <div className="product-description">
              {props.product?.category.description}
            </div>
          </>
        ) : (
          "Nu au fost gasite informatii"
        )}
      </Card>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return {
    product: state.products?.product,
    user: state.users?.user,
    cart: state.orders?.cart,
  };
}

const dispatchToProps = {
  getProductAction: ProductsActions.getProductAction,
  createOrderAction: OrdersActions.createOrderAction,
  addItemToOrderAction: OrdersActions.addItemToOrderAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(ProductViewComponent)
);

const styles = {
  container: {
    display: "flex",
    height: "100%",
  },
  productCard: {
    height: 700,
    width: 800,
    margin: "auto",
    padding: 30,
  },
  productCardContent: {
    margin: 20,
    display: "flex",
    justifyContent: "space-evenly",
  },
  categoryCard: {
    minHeight: 100,
    width: 800,
    margin: "auto",
    padding: 30,
    marginTop: 20,
  },
};
