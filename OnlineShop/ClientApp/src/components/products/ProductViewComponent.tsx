import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Card } from "reactstrap";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { OrdersActions } from "../../redux/orders";
import { ProductsActions } from "../../redux/products";
import { OrderDTO, OrderStatus, ProductDTO, UserDTO } from "../../redux/types";

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
      // } else if (!props.cart) {
      //   const order = {
      //     status: OrderStatus.CART,
      //     userId: props.user?.id,
      //   };
      //   props.createOrderAction(order);
    } else if (props.cart?.id && props.product?.id) {
      props.addItemToOrderAction(props.cart.id, props.product.id);
    }
  };

  return (
    <>
      <Card style={{ height: 800, width: 800, margin: "auto", padding: 30 }}>
        {props.product ? (
          <div style={{ ...styles.container, position: "relative" }}>
            <div
              style={{
                ...styles.image,
                backgroundImage: `url(${props.product.imageUrl})`,
              }}
            />
            <div
              style={{
                margin: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div style={{ ...styles.title }}>{props.product.name}</div>
              <div>
                <div style={{ ...styles.descriptionTag }}>Descriere</div>
                <div>{props.product.description}</div>
              </div>
              <div style={{ ...styles.descriptionTag, alignSelf: "flex-end" }}>
                {props.product.price} RON
              </div>
              <div>
                <div
                  style={{
                    color: props.product.isInStock ? "#518D0A" : "red",
                    margin: 10,
                  }}
                >
                  {props.product.isInStock ? "In stoc" : "Stoc epuizat"}
                </div>
                <div
                  onClick={props.product.isInStock ? addToCart : () => {}}
                  style={{
                    ...styles.checkDetails,
                    textAlign: "center",
                    cursor: props.product.isInStock ? "pointer" : "not-allowed",
                    backgroundColor: props.product.isInStock
                      ? "#28A745"
                      : "grey",
                  }}
                >
                  Adauga in cos
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Nu a fost gasit produsul"
        )}
      </Card>
      <Card style={{ width: 800, margin: "auto", padding: 30, marginTop: 20 }}>
        {props.product?.category ? (
          <>
            <div>
              Despre{" "}
              <span style={{ fontWeight: 600 }}>
                {props.product?.category.name}
              </span>
            </div>
            <div style={{ padding: 10 }}>
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
  image: {
    margin: 15,
    width: "50%",
    height: "90%",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  descriptionTag: {
    fontWeight: 600,
    margin: "10px 0",
    width: "100%",
  },
  checkDetails: {
    padding: 10,
    borderRadius: 5,
    width: "150px",
    color: "white",
  },
};
