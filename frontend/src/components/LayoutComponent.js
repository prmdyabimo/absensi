import React, { useState } from "react";
import Navbar from "./NavbarComponents";
import Sidebar from "./SidebarComponents";

const LayoutComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
};

export default LayoutComponent;
