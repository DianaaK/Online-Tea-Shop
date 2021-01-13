import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { AppState } from "../../redux";
import { AuthStore } from "../../redux/authentication";
import TextFieldComponent from "../shared/TextFieldComponent";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Email, Lock, Visibility, VisibilityOff } from "@material-ui/icons";

interface IProps {
  loginAction(Email: string, Password: string): any;
}

const LoginComponent = (props: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = () => {
    props.loginAction(user.email, user.password);
  };

  const triggerLoginByEnterPress = (event: any) => {
    let e = event || window.event;
    if (e.keyCode === 13) {
      loginHandler();
    }
  };

  return (
    <div className="row">
      <div className="col-sm-3" />
      <div className="col-sm-6">
        <Card style={{ height: 300, padding: 50 }}>
          <div className="form-group" style={{ marginLeft: 20 }}>
            <TextFieldComponent
              id="email"
              inType="email"
              label="Email"
              onKeyUp={(event: any) => triggerLoginByEnterPress(event)}
              onChange={(event: any) =>
                setUser({ ...user, email: event.target.value })
              }
              value={user.email}
              startAdornment={
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              }
            />
          </div>
          <div className="form-group" style={{ marginLeft: 20, marginTop: -3 }}>
            <TextFieldComponent
              id="password"
              inType="password"
              label="Password"
              onKeyUp={(event: any) => triggerLoginByEnterPress(event)}
              onChange={(event: any) =>
                setUser({ ...user, password: event.target.value })
              }
              value={user.password}
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div style={{ textAlign: "center", padding: "15px 0px" }}>
            <Button
              variant="contained"
              color="success"
              style={{ color: "white" }}
              onClick={loginHandler}
            >
              Log in
            </Button>
          </div>
          <div className="text-center">
            <NavLink to="/register" exact={true}>
              <p style={{ fontSize: 16, cursor: "pointer", color: "black" }}>
                Inregistrare
              </p>
            </NavLink>
          </div>
        </Card>
      </div>
      <div className="col-sm-3" />
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {};
}

const dispatchToProps = {
  loginAction: AuthStore.actions.loginAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(LoginComponent)
);
