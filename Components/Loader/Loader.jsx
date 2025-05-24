import React from "react";
import Link from "next/link";
// INTERNAL IMPORT
import Style from "./loader.module.css";

const Loader = () => {
  return (
    <div className={Style.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
