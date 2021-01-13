import * as React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Layout from "./components/Layout";
import ProductListComponent from "./components/products/ProductListComponent";
import ProductViewComponent from "./components/products/ProductViewComponent";
import LoginComponent from "./components/authentication/LoginComponent";
import RegisterComponent from "./components/authentication/RegisterComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import CartComponent from "./components/cart/CartComponent";

import "./custom.css";

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ProductListComponent} />
      <Route path="/products/:id" component={ProductViewComponent} />
      <Route path="/cart/:id" component={CartComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/register" component={RegisterComponent} />
      <Route path="/profile/:id" component={ProfileComponent} />
    </Switch>
  </Layout>
);
