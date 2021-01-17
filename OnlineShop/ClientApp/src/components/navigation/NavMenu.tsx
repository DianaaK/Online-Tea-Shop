import * as React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppState } from "../../redux";
import { OrderDTO, UserDTO } from "../../redux/types";
import { reduxContainer } from "../../redux/reduxContainer";
import { AuthStore } from "../../redux/authentication";
import { OrdersActions } from "../../redux/orders";
import { UserActions } from "../../redux/users";
import { Badge, Popover } from "@material-ui/core";
import { AuthUtils } from "../../utils";
import "./NavMenu.css";
import cover from "../../assets/images/cover.jpg";

interface IProps {
  token: any;
  user: UserDTO | null;
  cart: OrderDTO | null;
  logoutAction(): any;
  getUserById(userId: string): any;
  getCartOrder(userId: string): any;
}

interface IState {
  isOpen: boolean;
  adminPopoverAnchor: any;
  profilePopoverAnchor: any;
}

class NavMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
      adminPopoverAnchor: null,
      profilePopoverAnchor: null,
    };
  }

  componentDidMount() {
    const userId = this.props.token?.id;
    if (userId) {
      this.props.getUserById(userId);
      this.props.getCartOrder(userId);
    }
  }

  togglePopoverOpen = (event: any, type: string) => {
    if (type === "admin") {
      this.setState({
        adminPopoverAnchor: event.target,
      });
    } else {
      this.setState({
        profilePopoverAnchor: event.target,
      });
    }
  };

  togglePopoverClose = (type: string) => {
    if (type === "admin") {
      this.setState({
        adminPopoverAnchor: null,
      });
    } else {
      this.setState({
        profilePopoverAnchor: null,
      });
    }
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
        <div className="overlay" />
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
                {AuthUtils.isAdmin() ? (
                  <>
                    <NavItem
                      className="navbar-item"
                      onClick={(event: any) =>
                        this.togglePopoverOpen(event, "admin")
                      }
                      id="adminPopoverTarget"
                    >
                      <div
                        className="text-dark"
                        style={{ padding: "0.5rem", cursor: "pointer" }}
                      >
                        Administrator
                        <i className="material-icons navbar-icon">settings</i>
                      </div>
                    </NavItem>
                    {document.getElementById("adminPopoverTarget") && (
                      <Popover
                        open={!!this.state.adminPopoverAnchor}
                        anchorEl={this.state.adminPopoverAnchor}
                        onClose={() => this.togglePopoverClose("admin")}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <>
                          <NavLink
                            tag={Link}
                            className="text-dark"
                            to={"/admin/categories"}
                          >
                            Categorii
                          </NavLink>
                          <NavLink
                            tag={Link}
                            className="text-dark"
                            to={"/admin/products"}
                          >
                            Produse
                          </NavLink>
                          <NavLink
                            tag={Link}
                            className="text-dark"
                            to={"/admin/orders"}
                          >
                            Comenzi
                          </NavLink>
                        </>
                      </Popover>
                    )}
                  </>
                ) : null}
                <NavItem className="navbar-item">
                  <NavLink tag={Link} className="text-dark" to="/">
                    Ceaiuri
                    <i className="material-icons navbar-icon">eco</i>
                  </NavLink>
                </NavItem>
                <NavItem className="navbar-item">
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
                        <i className="material-icons navbar-icon">
                          shopping_cart
                        </i>
                      </Badge>
                    ) : (
                      <i className="material-icons navbar-icon">
                        shopping_cart
                      </i>
                    )}
                  </NavLink>
                </NavItem>
                <NavItem
                  className="navbar-item"
                  onClick={(event: any) =>
                    this.togglePopoverOpen(event, "profile")
                  }
                  id="popoverTarget"
                >
                  <div
                    className="text-dark"
                    style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    Profil
                    <i className="material-icons navbar-icon">face</i>
                  </div>
                </NavItem>
                <Popover
                  open={!!this.state.profilePopoverAnchor}
                  anchorEl={this.state.profilePopoverAnchor}
                  onClose={() => this.togglePopoverClose("profile")}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
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
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to={`/profile/${this.props.user?.id}/orders`}
                      >
                        Comenzile mele
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
    token: state.auth?.token,
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
