import React from "react";
import { Button } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";

import styles from "./button.module.css";

const PrimaryButton = (props: NativeButtonProps) => (
  <Button
    block
    size="middle"
    type="primary"
    className={styles.primary_button}
    {...props}
  />
);

const LinkButton = (props: NativeButtonProps) => (
  <Button type="link" className={styles.link_button} {...props} />
);

export { PrimaryButton, LinkButton };
