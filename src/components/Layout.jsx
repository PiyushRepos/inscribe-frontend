import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
