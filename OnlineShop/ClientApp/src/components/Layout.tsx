import * as React from "react";
import FooterComponent from "./Footer";
import NavMenu from "./navigation/NavMenu";

export default (props: { children?: React.ReactNode }) => (
  <React.Fragment>
    <NavMenu />
    <div style={{ backgroundColor: "#f2f2f2", padding: 50, minHeight: "55vh" }}>
      <div style={{ width: "90%", margin: "auto" }}>{props.children}</div>
    </div>
    <FooterComponent />
  </React.Fragment>
);
