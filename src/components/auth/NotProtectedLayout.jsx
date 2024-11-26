import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../homepage/HomeNavbar";
import Features from "../homepage/Features";
import Footer from "../homepage/Footer";

function NotProtectedLayout() {
  return (
    <div className="">
      {/* Navbar Section */}
      <div className="fixed top-0 left-0 w-full z-50">
        <HomeNavbar />
      </div>

      {/* Main Content Section */}
      <div className="pt-[4rem]">
        {" "}
        {/* Add padding to avoid overlap */}
        <Outlet />
      </div>

      <Features />

      <Footer />
    </div>
  );
}

export default NotProtectedLayout;
