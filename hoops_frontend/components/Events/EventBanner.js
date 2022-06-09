import React from "react";
import Image from "next/image";
import Banner from "../Layout/Banner";

function EventBanner({ src, children }) {
  return (
    <Banner>
      <Image
        src={src || `/basketball_court.svg`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute w-full h-full text-center">
        <div className="w-full h-full text-center grid place-items-center ">
          {children}
        </div>
      </div>
    </Banner>
  );
}

export default EventBanner;
