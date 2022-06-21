import { useSession } from "next-auth/react";
import React from "react";
import NavbarBrand from "./NavbarBrand";
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "../Dropdowns/UserDropdown";
import Footer from "components/Layout/Footer";
import NavbarLinks from "./NavbarLinks";
import NavbarMenuButton from "./NavbarMenuButton";

function Drawer({ children }) {
  const { data: session, status } = useSession();

  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="w-full navbar bg-base-100">
          <div className="flex-1 mx-2">
            <NavbarBrand />
          </div>
          <div className="flex-none lg:hidden">
            <NavbarMenuButton />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <NavbarLinks />
              {/* <NavbarSearch className="hidden md:block" /> */}
              {session && status === "authenticated" ? (
                <li>
                  <a>
                    <UserDropdown end={true} />
                  </a>
                </li>
              ) : (
                <>
                  <Link href="/login">
                    <li>
                      <a className="font-medium btn btn-outline btn-success">
                        Login
                      </a>
                    </li>
                  </Link>
                  <Link href="/register">
                    <li>
                      <a className="font-medium ml-2 btn btn-outline rounded-lg">
                        Register
                      </a>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <div className="flex-1 mb-10">{children}</div>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}

          {session && status === "authenticated" ? (
            <UserDropdown />
          ) : (
            <>
              <Link href="#">
                <li className="hover-bordered">
                  <a className="font-medium">Login</a>
                </li>
              </Link>
              <Link href="/register">
                <li className="hover-bordered">
                  <a className=" font-medium">Register</a>
                </li>
              </Link>
            </>
          )}
          <NavbarLinks />
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
