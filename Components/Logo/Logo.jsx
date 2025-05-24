import React from "react";
import Link from "next/link";
// INTERNAL IMPORT
import Style from "./Logo.module.css";
import { LogoBlockchain } from "../SVG/index";

const Logo = () => {
  return (
    <div>
      <LogoBlockchain />
    </div>
  );
};

export default Logo;
