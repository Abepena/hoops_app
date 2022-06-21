import React from "react";
import Link from "next/link";

function NavbarLinks() {
  return (
    <>
      <Link href="#TODO">
        <li className="hover-bordered">
          <a className="font-medium">Leagues</a>
        </li>
      </Link>
      <Link href="#TODO">
        <li className="hover-bordered">
          <a className="font-medium">Training</a>
        </li>
      </Link>
      <Link href="#TODO">
        <li className="hover-bordered">
          <a className="font-medium">Pick Up</a>
        </li>
      </Link>
      <Link href="/events">
        <li className="hover-bordered">
          <a className="font-medium">Events</a>
        </li>
      </Link>
    </>
  );
}

export default NavbarLinks;
