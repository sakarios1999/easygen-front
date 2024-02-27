import { Tabs } from "antd";
import { TabPaneProps, TabsProps } from "antd/lib/tabs";
import React from "react";

import styles from "./tabs.module.css";

const StyledTabs = ({ children, ...props }: TabsProps) => (
  <Tabs centered className={styles.styled_tabs} {...props}>
    {children}
  </Tabs>
);

const StyledTabPane = ({ children, ...props }: TabPaneProps) => (
  <Tabs.TabPane className={styles.styled_tabpane} {...props}>
    {children}
  </Tabs.TabPane>
);

export { StyledTabs, StyledTabPane };
