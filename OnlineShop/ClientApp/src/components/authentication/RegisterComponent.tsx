import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "reactstrap";
import { NavLink } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Face from "@material-ui/icons/Face";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextFieldComponent from "../shared/TextFieldComponent";
import { AppState } from "../../redux";
import { AuthStore } from "../../redux/authentication";
import { UserDTO } from "../../redux/types";

interface IProps {
  registerAction(user: UserDTO): any;
}

const RegisterComponent = (props: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(new UserDTO());

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerHandler = () => {
    props.registerAction(user);
  };

  const triggerRegisterByEnterPress = (event: any) => {
    let e = event || window.event;
    if (e.keyCode === 13) {
      registerHandler();
    }
  };

  return (
    <div className="row">
      <div className="col-sm-3" />
      <div className="col-sm-6">
        <Card style={{ height: 300, padding: 50 }}>
          <div className="row" style={{ margin: 10 }}>
            <div className="col-sm-6">
              <TextFieldComponent
                label="First name"
                id="firstName"
                inType="text"
                onKeyUp={(event: any) => triggerRegisterByEnterPress(event)}
                onChange={(event: any) =>
                  setUser({ ...user, firstName: event.target.value })
                }
                value={user.firstName}
                startAdornment={
                  <InputAdornment position="start">
                    <Face />
                  </InputAdornment>
                }
              />
            </div>
            <div className="col-sm-6">
              <TextFieldComponent
                label="Last name"
                id="lastName"
                inType="text"
                onKeyUp={(event: any) => triggerRegisterByEnterPress(event)}
                onChange={(event: any) =>
                  setUser({ ...user, lastName: event.target.value })
                }
                value={user.lastName}
                startAdornment={
                  <InputAdornment position="start">
                    <Face />
                  </InputAdornment>
                }
              />
            </div>
          </div>
          <div className="row" style={{ margin: 10 }}>
            <div className="col-sm-6">
              <TextFieldComponent
                label="Email"
                id="email"
                inType="text"
                onKeyUp={(event: any) => triggerRegisterByEnterPress(event)}
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
            <div className="col-sm-6">
              <TextFieldComponent
                label="Password"
                id="password"
                inType="password"
                onKeyUp={(event: any) => triggerRegisterByEnterPress(event)}
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
          </div>
          <div style={{ textAlign: "center", padding: "15px 0px" }}>
            <Button
              variant="contained"
              color="success"
              style={{ color: "white" }}
              onClick={registerHandler}
            >
              Inregistrare
            </Button>
          </div>
          <div className="text-center">
            <NavLink to="/login" exact={true}>
              <p style={{ fontSize: 16, color: "black", cursor: "pointer" }}>
                Ai deja un cont? Autentificare
              </p>
            </NavLink>
          </div>
        </Card>
      </div>
      <div className="col-sm-4" />
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {};
}

const dispatchToProps = {
  registerAction: AuthStore.actions.registerAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(RegisterComponent)
);
