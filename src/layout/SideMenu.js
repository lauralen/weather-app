import React from "react";
import style from "./SideMenu.module.scss";

const SideMenu = ({ isOpen, children }) => {
  return (
    <div className={`${style.menu} ${isOpen && style.open}`}>{children}</div>
  );
};

export default SideMenu;
