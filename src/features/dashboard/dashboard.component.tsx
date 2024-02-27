import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import Spline from "@splinetool/react-spline";

import { RootState } from "&store/store";
import { TextField } from "@mui/material";

type ReduxProps = ConnectedProps<typeof connector>;

const DashboardComponent = (props: ReduxProps) => {
  useEffect(() => {
    let meta = document.querySelector("meta[name=viewport]");
    meta?.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    );
    window.scrollTo(0, 1);
  }, []);

  return (
    <>
      <Spline scene="https://prod.spline.design/319xtNpl7bUPWiJK/scene.splinecode" />
    </>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps);
const DashboardComponentRedux = connector(DashboardComponent);

export { DashboardComponentRedux as DashboardComponent };
