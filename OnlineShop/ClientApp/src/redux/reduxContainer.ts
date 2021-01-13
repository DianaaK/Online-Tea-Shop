import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export function reduxContainer(
  WrappedComponent: React.ComponentClass<any>,
  mapStateToProps: any,
  dispatchToProps: any
) {
  function mapDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators(dispatchToProps, dispatch);
  }

  return withRouter(
    connect<{}, {}, {}>(
      mapStateToProps,
      mapDispatchToProps
    )(WrappedComponent) as any
  );
}
