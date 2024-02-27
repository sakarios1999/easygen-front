import React from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";

import styles from "./input.module.css";

const InputText = (props: InputProps) => (
  <Input className={styles.styled_input_text} {...props} />
);

const InputPassword = (props: InputProps) => (
  <Input.Password
    visibilityToggle={true}
    className={styles.styled_input_password}
    {...props}
  />
);

export { InputText, InputPassword };
