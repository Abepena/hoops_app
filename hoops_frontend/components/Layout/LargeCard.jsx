import React from "react";
import Image from "next/image";

function LargeCard({ img }) {
  return (
    <section className="relative h-96 min-w-[300px] w-full">
      <Image
        src={img || "/lazy-basketball.jpg"}
        layout="fill"
        objectFit="cover"
        className="rounded-lg border"
      />
      <div className="absolute top-12 right-12 max-w-xs">
        <div className="bg-base-100 shadow-xl p-5 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl text-center">Its time for some fun</h3>
            <h4 className="mb-2 ">Reach out to get started or if you have any questions</h4>
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="contact-modal"
              className="btn mx-auto btn-secondary modal-button"
            >
              Contact Us
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LargeCard;
