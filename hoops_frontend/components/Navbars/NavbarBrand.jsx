import Link from "next/link";
import React from "react";

function NavbarBrand() {
  return (
    <Link href="/">
      <a className="btn btn-ghost normal-case text-xl">
        <i className="fa-solid fa-basketball text-3xl mr-2 text-orange-500 opacity-50"></i>
        Pure Hoops
      </a>
    </Link>
  );
}

export default NavbarBrand;
