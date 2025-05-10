import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
