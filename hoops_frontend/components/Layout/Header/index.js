import React, { useState } from "react";
import Brand from "./Brand";
import Menu from "./Menu";

import Search from "./Search";

function Header() {
  return (
    <header className="sticky shadow-md bg-white top-0 z-50 p-5 md:px-10">
      <div className="container mx-auto grid grid-cols-3 sm:flex sm:items-center sm:justify-between">
        {/* Left  Logo */}
        <Brand />
        {/* Mid Search Bar*/}
        <Search />
        {/* Right Icons*/}
        <Menu />
      </div>
    </header>
  );
}

export default Header;
