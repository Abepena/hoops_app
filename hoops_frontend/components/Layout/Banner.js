import React from "react";
import Image from "next/image";

function Banner({ children }) {
  return (
    <div className="relative h-[250px] lg:h-[300px] xl:h-[400px] 2xl:h-[550px] ">
      <Image src={"/basketball_court.svg"} layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 -mt-2 w-full text-center">
        {children}
      </div>
    </div>
  );
}

export default Banner;
