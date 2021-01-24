import React from "react";
import style from "./Section.module.scss";

const Section = ({ children }) => {
  return <div className={style.section}>{children}</div>;
};

export default Section;
