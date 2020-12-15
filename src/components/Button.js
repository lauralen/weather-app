import React from "react";
import style from "./Button.module.scss";

const Button = ({ children }) => {
  return <button className={style.button}>{children}</button>;
};

export default Button;
