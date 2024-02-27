import React from "react";
import { Result } from "antd";
import { Router, Route, Switch, Redirect } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

import { history, RootState } from "./store/store";
import { ProtectedRoute } from "./route/protectedRoute";
import { PrimaryButton } from "./styled/button/button.component";
import { LandingComponent } from "./features/landing/landing.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";

type ReduxProps = ConnectedProps<typeof connector>;

const AppRouter = (props: ReduxProps) => {
  const { isLoggedIn } = props;
  const { t } = useTranslation(["app"]);

  return (
    <Router history={history}>
      {/* App main routing switch */}
      <Switch>
        <Route exact path="/" component={LandingComponent} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={DashboardComponent}
          validator={isLoggedIn}
          fallBack="/"
        />
        <Route
          path="/404"
          render={() => (
            <Result
              status="404"
              title="404"
              subTitle={t("common:_404")}
              extra={
                <PrimaryButton block={false} onClick={() => history.push("/")}>
                  {t("common:BACK")}
                </PrimaryButton>
              }
            />
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.landing.isLoggedIn,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRouteRedux = connector(AppRouter);

export { AppRouteRedux as AppRouter };
