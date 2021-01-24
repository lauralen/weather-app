import React from "react";
import style from "./Header.module.scss";

const Header = ({ children }) => {
  return <header className={style.header}>{children}</header>;
};

export default Header;
