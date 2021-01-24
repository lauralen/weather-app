import React from "react";
import style from "./Tooltip.module.scss";

const Tooltip = ({ children, type }) => {
  return (
    <div className={`${style.tooltip} ${type && style[type]}`}>{children}</div>
  );
};

export default Tooltip;
