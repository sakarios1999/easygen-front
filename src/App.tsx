import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ConfigProvider, message } from "antd";
import { useTranslation } from "react-i18next";
import { usePromiseTracker } from "react-promise-tracker";

import "./App.css";
import "antd/dist/antd.css";
import { AppRouter } from "./App.router";

type ReduxProps = ConnectedProps<typeof connector>;

const App = (props: ReduxProps) => {
  const { i18n, t } = useTranslation(["app", "common"]);
  const { promiseInProgress } = usePromiseTracker();
  const isMobile = window.matchMedia("(any-pointer:coarse)").matches;

  const [isOnline, setIsOnline] = useState(true);

  window.addEventListener("online", () => {
    setIsOnline(true);
  });

  window.addEventListener("offline", () => {
    setIsOnline(false);
  });

  message.config({ maxCount: 1, duration: 2, top: 60 });

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  return (
    <ConfigProvider direction={i18n.dir()}>
      <AppRouter />
    </ConfigProvider>
  );
};

const connector = connect(undefined, undefined);
const AppRedux = connector(App);

export { AppRedux as App };
