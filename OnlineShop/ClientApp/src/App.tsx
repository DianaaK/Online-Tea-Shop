import * as React from "react";
import { Route } from "react-router";
import { Switch, withRouter } from "react-router-dom";
import { AppState } from "./redux";
import { connect } from "react-redux";
import Layout from "./components/Layout";
import ProductListComponent from "./components/products/ProductListComponent";
import ProductViewComponent from "./components/products/ProductViewComponent";
import LoginComponent from "./components/authentication/LoginComponent";
import RegisterComponent from "./components/authentication/RegisterComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import UserOrdersComponent from "./components/profile/UserOrdersComponent";
import CartComponent from "./components/cart/CartComponent";
import {
  CategoryFormComponent,
  CategoryListComponent,
  OrderListComponent,
  ProductAdminListComponent,
  ProductFormComponent,
} from "./components/admin";
import { UserDTO } from "./redux/types";
import { AuthUtils, GuardedRoute } from "./utils";

import "./custom.css";

interface IProps {
  token: any;
}

const App = (props: IProps) => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ProductListComponent} />
      <Route path="/products/:id" component={ProductViewComponent} />
      <Route path="/cart/:id" component={CartComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/register" component={RegisterComponent} />
      <Route path="/profile/:id/orders" component={UserOrdersComponent} />
      <Route path="/profile/:id" component={ProfileComponent} />
      <GuardedRoute
        path="/admin/categories/add"
        component={CategoryFormComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/categories/:id"
        component={CategoryFormComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/categories"
        component={CategoryListComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/products/add"
        component={ProductFormComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/products/:id"
        component={ProductFormComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/products"
        component={ProductAdminListComponent}
        auth={AuthUtils.isAdmin()}
      />
      <GuardedRoute
        path="/admin/orders"
        component={OrderListComponent}
        auth={AuthUtils.isAdmin()}
      />
    </Switch>
  </Layout>
);

function mapStateToProps(state: AppState) {
  return {
    token: state.auth?.token,
  };
}

const dispatchToProps = {};

export default withRouter(connect(mapStateToProps, dispatchToProps)(App));
