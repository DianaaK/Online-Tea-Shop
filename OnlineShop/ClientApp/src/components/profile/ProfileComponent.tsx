import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import { LocationCity, Phone, PinDrop, Public } from "@material-ui/icons";
import TextFieldComponent from "../shared/TextFieldComponent";
import { AddressDTO, UserDTO } from "../../redux/types";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { AppState } from "../../redux";
import { UserActions } from "../../redux/users";
import { connect } from "react-redux";

interface IProps {
  user: UserDTO | null;
  getUserById(userId: string): any;
  editUserAction(user: UserDTO): any;
  editAddressAction(address: AddressDTO, hasData: boolean): any;
}

const ProfileComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  const [user, setUser] = useState<any>(props.user || null);

  useEffect(() => {
    if (!props.user) {
      const userId = props.match.params.id;
      props.getUserById(userId);
    }
  }, []);

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  const handleAddress = (event: any) => {
    const key = event.target.getAttribute("id");
    const value = event.target.value;
    const userAddress = { ...user?.address } || new AddressDTO();
    userAddress[key] = value;
    setUser({ ...user, address: userAddress });
  };

  const saveAddress = () => {
    const data = { ...user.address, userId: user.id };
    const hasAddress = !!props.user?.address;
    props.editAddressAction(data, hasAddress);
  };

  const renderProfileFields = () => {
    return user ? (
      <>
        <div className="row" style={{ margin: 10 }}>
          <div className="col-sm-6">
            <TextFieldComponent
              label="Prenume"
              id="firstName"
              inType="text"
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
              label="Nume"
              id="lastName"
              inType="text"
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
        </div>
        <div className="row" style={{ margin: 10 }}>
          <div className="col-sm-6">
            <TextFieldComponent
              label="Telefon"
              id="phone"
              inType="text"
              onChange={(event: any) =>
                setUser({ ...user, phone: event.target.value })
              }
              value={user.phone || ""}
              startAdornment={
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </>
    ) : null;
  };

  const renderAddressFields = () => {
    return user ? (
      <>
        <div className="row" style={{ margin: 10 }}>
          <div className="col-sm-6">
            <TextFieldComponent
              label="Tara"
              id="country"
              inType="text"
              onChange={(event: any) => handleAddress(event)}
              value={user.address?.country || ""}
              startAdornment={
                <InputAdornment position="start">
                  <Public />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <div className="row" style={{ margin: 10 }}>
          <div className="col-sm-6">
            <TextFieldComponent
              label="Oras"
              id="city"
              inType="text"
              onChange={(event: any) => handleAddress(event)}
              value={user.address?.city || ""}
              startAdornment={
                <InputAdornment position="start">
                  <LocationCity />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <div className="row" style={{ margin: 10 }}>
          <div className="col-sm-12">
            <TextFieldComponent
              label="Strada"
              id="street"
              inType="text"
              onChange={(event: any) => handleAddress(event)}
              value={user.address?.street || ""}
              startAdornment={
                <InputAdornment position="start">
                  <PinDrop />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </>
    ) : null;
  };

  return (
    <Card style={{ height: 800, width: 800, margin: "auto", padding: 30 }}>
      {user ? (
        <>
          {renderProfileFields()}
          <div style={{ textAlign: "center", padding: "15px 0px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => props.editUserAction(user)}
            >
              Editeaza profilul
            </Button>
          </div>
          {renderAddressFields()}
          <div style={{ textAlign: "center", padding: "15px 0px" }}>
            <Button variant="contained" color="success" onClick={saveAddress}>
              Salveaza adresa
            </Button>
          </div>
        </>
      ) : (
        "Nu a fost gasit utilizatorul"
      )}
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.users?.user,
  };
}

const dispatchToProps = {
  getUserById: UserActions.getUserById,
  editUserAction: UserActions.editUserAction,
  editAddressAction: UserActions.editAddressAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(ProfileComponent)
);
