import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopNavStyle } from "./style";
import { Outlet } from "react-router";

const TopNav = ({ children }) => {
  return (
    <>
      <TopNavStyle>{children}</TopNavStyle>
      <Outlet />
    </>
  );
};

export default TopNav;
