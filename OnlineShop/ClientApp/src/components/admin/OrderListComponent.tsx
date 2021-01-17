import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Card, Table } from "reactstrap";
import { MenuItem, Select } from "@material-ui/core";
import Swal from "sweetalert2";
import { AppState } from "../../redux";
import { OrderDTO } from "../../redux/types";
import { OrdersActions } from "../../redux/orders";

interface IProps {
  order_list: Array<OrderDTO> | null;
  getOrderListAction(): any;
  editOrderAction(order: OrderDTO): any;
  deleteOrderAction(orderId: string): any;
}

const OrderListComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  useEffect(() => {
    props.getOrderListAction();
  }, []);

  const deleteItem = (event: any) => {
    Swal.fire({
      title: "Esti sigur ca vrei sa stergi comanda?",
      showDenyButton: true,
      confirmButtonText: "Sterge",
      denyButtonText: "Renunta",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderId = event.target.getAttribute("id");
        props.deleteOrderAction(orderId);
      }
    });
  };

  const getTotalValue = (item: OrderDTO) => {
    let totalValue = 0;
    item.products?.forEach(
      (item: any) => (totalValue += item.amount * item.product?.price)
    );
    return totalValue.toFixed(2);
  };

  const getNumberOfProducts = (item: OrderDTO) => {
    let totalProducts = 0;
    item.products?.forEach((product: any) => (totalProducts += product.amount));
    return totalProducts;
  };

  const getDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleString();
  };

  const changeOrderStatus = (event: any) => {
    const orderId = event.target.name;
    const orderStatus = event.target.value;
    const order = props.order_list?.find(
      (item: OrderDTO) => item.id + "" === orderId
    );
    const updatedOrder = { ...order, status: orderStatus };
    delete updatedOrder.user;
    delete updatedOrder.products;
    props.editOrderAction(updatedOrder);
  };

  const renderOrderStatus = (item: OrderDTO) => {
    return (
      <Select
        id={item.id + ""}
        name={item.id + ""}
        value={item.status !== undefined ? item.status : ""}
        onChange={changeOrderStatus}
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
        <MenuItem value={0}>Finalizat</MenuItem>
        <MenuItem value={1}>In procesare</MenuItem>
        <MenuItem value={2}>Anulat</MenuItem>
      </Select>
    );
  };

  return (
    <Card
      style={{ maxWidth: "75vw", margin: "auto", padding: 30 }}
      className="custom-card"
    >
      {props.order_list?.length ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Id comanda</th>
                <th>Nume utilizator</th>
                <th>Email utilizator</th>
                <th>Numar produse</th>
                <th>Valoare</th>
                <th>Status</th>
                <th>Actiuni</th>
              </tr>
            </thead>
            <tbody>
              {props.order_list.map((item: OrderDTO, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{getDate(item.createTime || "")}</td>
                  <td>{item.id}</td>
                  <td>{item.user?.firstName + " " + item.user?.lastName}</td>
                  <td>{item.user?.email}</td>
                  <td>{getNumberOfProducts(item)}</td>
                  <td>{getTotalValue(item)} lei</td>
                  <td>{renderOrderStatus(item)}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <div
                        className="icon"
                        onClick={deleteItem}
                        id={item.id + ""}
                        style={{ color: "red" }}
                      >
                        <i className="material-icons" id={item.id + ""}>
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
        "Nu exista comenzi"
      )}
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    order_list: state.orders?.order_list,
  };
}

const dispatchToProps = {
  getOrderListAction: OrdersActions.getOrderListAction,
  editOrderAction: OrdersActions.editOrderAction,
  deleteOrderAction: OrdersActions.deleteOrderAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(OrderListComponent)
);
