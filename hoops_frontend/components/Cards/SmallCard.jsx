import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";

function SmallCard({ event }) {
  const { id } = event;
  const { name, date, location, image, cost } = event.attributes;
  const img_url = process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url

  return (
    <Link href={`/events/${id}`}>
      <a className="hover:scale-105 mb-2 md:mb-0 cursor-pointer hover:opacity-80  transition-all duration-300 ease-in-out">
        <div className="card dark:bg-base-300 shadow-md hover:shadow-2xl  w-80 sm:w-full">
          <figure className="h-96 relative">
            <Image
              layout="fill"
              className="h-full w-full object-cover"
              src={`${img_url}`}
              alt="event image"
            />
          </figure>
          <div className="card-body">
            <div className="card-title">{name}</div>
            <h3 className="truncate">{location.data.attributes.name}</h3>
            <Moment fromNow className="text-xs text-gray-400" date={date} />
            <div className="card-actions items-end justify-end">
              <div className="badge badge-success">{cost ? `$${cost.toFixed(2)}` : "Free"}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default SmallCard;
