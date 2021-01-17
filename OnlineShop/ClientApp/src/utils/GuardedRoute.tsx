import React from "react";
import { Route, Redirect } from "react-router-dom";

export const GuardedRoute: React.FC<any> = ({
  component: Component,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
