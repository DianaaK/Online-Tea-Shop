import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Card, Table } from "reactstrap";
import { AppState } from "../../redux";
import { OrderDTO, UserDTO } from "../../redux/types";
import { OrdersActions } from "../../redux/orders";
import { UserActions } from "../../redux/users";

interface IProps {
  user: UserDTO | null;
  user_order_list: Array<OrderDTO> | null;
  getOrdersForUserAction(userId: string): any;
  getUserById(userId: string): any;
}

const UserOrdersComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  useEffect(() => {
    const userId = props.match.params.id;
    props.getOrdersForUserAction(userId);
    if (!props.user) {
      props.getUserById(userId);
    }
  }, []);

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

  const getOrderStatus = (order: OrderDTO) => {
    switch (order.status) {
      case 0:
        return "Finalizat";
      case 1:
        return "In procesare";
      case 2:
        return "Anulat";
      default:
        return "Necunoscut";
    }
  };

  return (
    <Card
      style={{ maxWidth: "75vw", margin: "auto", padding: 30 }}
      className="custom-card"
    >
      {props.user_order_list?.length ? (
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
              </tr>
            </thead>
            <tbody>
              {props.user_order_list.map((item: OrderDTO, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{getDate(item.createTime || "")}</td>
                  <td>{item.id}</td>
                  <td>{props.user?.firstName + " " + props.user?.lastName}</td>
                  <td>{props.user?.email}</td>
                  <td>{getNumberOfProducts(item)}</td>
                  <td>{getTotalValue(item)} lei</td>
                  <td>{getOrderStatus(item)}</td>
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
    user_order_list: state.orders?.user_order_list,
    user: state.users?.user,
  };
}

const dispatchToProps = {
  getOrdersForUserAction: OrdersActions.getOrdersForUserAction,
  getUserById: UserActions.getUserById,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(UserOrdersComponent)
);
