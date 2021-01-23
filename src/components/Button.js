import React from "react";
import style from "./Button.module.scss";

const Button = ({ type, onClick, disabled, children }) => {
  return (
    <button className={style[type]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
