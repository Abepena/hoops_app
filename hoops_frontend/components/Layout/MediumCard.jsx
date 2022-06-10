import Image from "next/image";
import React from "react";

function MediumCard({ img, title }) {
  return (
    <div className="hover:scale-105 cursor-pointer transition transform duration-300 ease-out mb-2">
      <div className="h-80 w-80 relative">
        <img layout="fill" src={img} alt={title} className="rounded-lg h-80 w-80 object-cover" />
      </div>
      <h3 className="text-lg">{title}</h3>
    </div>
  );
}

export default MediumCard;
