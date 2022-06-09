import React from "react";
import Image from "next/image";
import Link from "next/link";

function Brand() {
  return (
    <Link href="/">
      <a className="flex items-center h-10 cursor-pointer">
        <div className="h-12 w-12">
          <Image src={"/"} alt="Logo" />
        </div>
        <h1 className="hidden sm:inline-flex ml-1 px-1 border-l-2 border-black ">
          Pure Hoops
        </h1>
      </a>
    </Link>
  );
}

export default Brand;
