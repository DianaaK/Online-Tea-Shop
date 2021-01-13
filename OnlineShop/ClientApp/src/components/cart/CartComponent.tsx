import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { AuthStore } from "../../redux/authentication";
import { OrdersActions } from "../../redux/orders";
import { OrderDTO, OrderStatus } from "../../redux/types";
import emptyCart from "../../assets/images/emptyCart.png";

interface IProps {
  cart: OrderDTO | null;
  editOrderAction(order: OrderDTO): any;
  deleteItemFromOrderAction(orderId: number, productId: number): any;
  getCartOrder(userId: string): any;
  redirectAction(route: string): any;
}

const CartComponent = (props: IProps & RouteComponentProps<{ id: string }>) => {
  useEffect(() => {
    if (!props.cart) {
      const userId = props.match.params.id;
      props.getCartOrder(userId);
    }
  }, []);

  const getTotalValue = () => {
    let totalValue = 0;
    props.cart?.products?.forEach(
      (item: any) => (totalValue += item.amount * item.product?.price)
    );
    return totalValue.toFixed(2);
  };

  const saveCart = () => {
    const data = {
      ...props.cart,
      status: OrderStatus.PENDING,
      amount: parseInt(getTotalValue()),
    };
    props.editOrderAction(data);
    props.redirectAction("/");
    Swal.fire({
      text: "Comanda a fost plasata!",
      icon: "success",
      timer: 1500,
    });
  };

  const deleteItem = (event: any) => {
    const productId = event.target.getAttribute("id");
    const orderId = props.cart?.id;
    if (orderId && productId) {
      props.deleteItemFromOrderAction(orderId, productId);
    }
  };

  return (
    <>
      <Card style={{ minHeight: 400, width: 800, margin: "auto", padding: 30 }}>
        {props.cart?.products?.length ? (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produs</th>
                  <th>Cantitate</th>
                  <th>Pret</th>
                  <th>Pret total</th>
                  <th>Actiuni</th>
                </tr>
              </thead>
              <tbody>
                {props.cart.products.map((item: any, index: number) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.product?.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.product?.price}</td>
                    <td>{item.product?.price * item.amount}</td>
                    <td>
                      <div
                        onClick={(event) => {
                          deleteItem(event);
                        }}
                        id={item.product.id}
                        style={styles.icon}
                      >
                        <i className="material-icons" id={item.product.id}>
                          delete
                        </i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div style={styles.total}>Total: {getTotalValue()} RON</div>
            <div style={{ textAlign: "center", padding: "15px 0px" }}>
              <Button
                variant="contained"
                color="success"
                style={{ color: "white" }}
                onClick={saveCart}
              >
                Plaseaza comanda
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ ...styles.container, flexDirection: "column" }}>
            <div style={styles.image} />
            <div style={{ ...styles.empty, textAlign: "center" }}>
              Cosul este gol! Incepe cumparaturile acum!
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return {
    cart: state.orders?.cart,
  };
}

const dispatchToProps = {
  getCartOrder: OrdersActions.getCartOrder,
  editOrderAction: OrdersActions.editOrderAction,
  deleteItemFromOrderAction: OrdersActions.deleteItemFromOrderAction,
  redirectAction: AuthStore.actions.redirectAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(CartComponent)
);

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    backgroundImage: `url(${emptyCart})`,
    backgroundSize: "contain",
    height: 200,
    width: 200,
    margin: 40,
  },
  total: {
    fontSize: 17,
    fontWeight: 500,
  },
  empty: {
    fontSize: 17,
  },
  icon: {
    color: "red",
    cursor: "pointer",
    width: 50,
    zIndex: 3,
  },
};
