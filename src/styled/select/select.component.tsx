import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import React from "react";

import styles from "./select.module.css";
const countryCodes = require("../../config/countryCodes.json");

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;
}

const StyledSelect = ({ children, ...props }: SelectProps<string>) => (
  <Select className={styles.styled_select} {...props}>
    {children}
  </Select>
);

const CountryCodeSelect = (props: SelectProps<string>) => (
  <StyledSelect {...props}>
    {countryCodes.map(
      (countryCode: { name: string; dial_code: string; code: string }) => (
        <Select.Option key={countryCode.code} value={countryCode.dial_code}>
          {countryCode.dial_code}
        </Select.Option>
      )
    )}
  </StyledSelect>
);

export { StyledSelect, CountryCodeSelect };
