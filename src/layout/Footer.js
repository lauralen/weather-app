import React from "react";
import style from "./Footer.module.scss";

const Footer = ({ children }) => {
  return <footer className={style.footer}>{children}</footer>;
};

export default Footer;
