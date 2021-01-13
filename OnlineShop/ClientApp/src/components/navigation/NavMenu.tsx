import * as React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Popover,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppState } from "../../redux";
import { OrderDTO, UserDTO } from "../../redux/types";
import "./NavMenu.css";
import cover from "../../assets/images/cover.jpg";
import { reduxContainer } from "../../redux/reduxContainer";
import { AuthStore } from "../../redux/authentication";
import { OrdersActions } from "../../redux/orders";
import { UserActions } from "../../redux/users";
import { Badge } from "@material-ui/core";

interface IProps {
  auth_token: any;
  user: UserDTO | null;
  cart: OrderDTO | null;
  logoutAction(): any;
  getUserById(userId: string): any;
  getCartOrder(userId: string): any;
}

interface IState {
  isOpen: boolean;
  profileOpen: boolean;
}

class NavMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
      profileOpen: false,
    };
  }

  componentDidMount() {
    const userId = this.props.auth_token?.id;
    if (userId) {
      this.props.getUserById(userId);
      this.props.getCartOrder(userId);
    }
  }

  toggleProfile = () => {
    this.setState({
      profileOpen: !this.state.profileOpen,
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  getCartProducts = () => {
    let totalProducts = 0;
    this.props.cart?.products?.forEach(
      (product: any) => (totalProducts += product.amount)
    );
    return totalProducts;
  };

  render() {
    const cartProducts = this.props.cart?.products;
    return (
      <header>
        <div
          style={{
            backgroundImage: `url(${cover})`,
            backgroundPosition: "top",
            height: 200,
          }}
        />
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Ceainarie.ro
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Ceaiuri
                    <i className="material-icons" style={styles.icon}>
                      eco
                    </i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to={`/cart/${this.props.user?.id}`}
                  >
                    Cos
                    {cartProducts?.length ? (
                      <Badge
                        badgeContent={this.getCartProducts()}
                        color="primary"
                      >
                        <i className="material-icons" style={styles.icon}>
                          shopping_cart
                        </i>
                      </Badge>
                    ) : (
                      <i className="material-icons" style={styles.icon}>
                        shopping_cart
                      </i>
                    )}
                  </NavLink>
                </NavItem>
                <NavItem onClick={this.toggleProfile} id="popoverTarget">
                  <div
                    className="text-dark"
                    style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    Profil
                    <i className="material-icons" style={styles.icon}>
                      face
                    </i>
                  </div>
                </NavItem>
                <Popover
                  placement="bottom"
                  isOpen={this.state.profileOpen}
                  target="popoverTarget"
                  toggle={this.toggleProfile}
                >
                  {this.props.user ? (
                    <>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to={`/profile/${this.props.user?.id}`}
                      >
                        Contul meu
                      </NavLink>
                      <div
                        className="text-dark"
                        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                        onClick={this.props.logoutAction}
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink tag={Link} className="text-dark" to={`/login`}>
                        Login
                      </NavLink>
                      <NavLink tag={Link} className="text-dark" to="/register">
                        Inregistrare
                      </NavLink>
                    </>
                  )}
                </Popover>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    auth_token: state.auth?.token,
    user: state.users?.user,
    cart: state.orders.cart,
  };
}

const dispatchToProps = {
  logoutAction: AuthStore.actions.logoutAction,
  getCartOrder: OrdersActions.getCartOrder,
  getUserById: UserActions.getUserById,
};

export default reduxContainer(NavMenu, mapStateToProps, dispatchToProps);

const styles = {
  icon: {
    margin: "0 15px 0px 5px",
    fontSize: 16,
  },
};
