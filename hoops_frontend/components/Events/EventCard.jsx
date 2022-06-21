import React from "react";
import Moment from "react-moment";
import Link from "next/link";
import Image from "next/image";


function EventCard({ event: { id, attributes } }) {
  // name, event_date, location, id, img_url, cost
  const { name, date, location, image, cost } = attributes;
  const img_url = process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url;

  return (
    <Link href={`/events/${id}`}>
      <a className="hover:scale-105 mb-2 md:mb-0 cursor-pointer hover:shadow-md hover:opacity-80 transition duration-200 ease-in-out">
        <div className="dark:bg-base-300 shadow-2xl card max-w-xs sm:w-full">
          <figure className="h-96 sm:h-80 relative">
             <Image
            layout="fill"
            objectFit="cover"
              className="h-full w-full"
              src={`${img_url}`}
              alt="event image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <h3 className="truncate">{location.data.attributes.name}</h3>
            <Moment fromNow className="text-xs text-gray-400" date={date} />
            <div className="card-actions items-end justify-end">
              <div className="badge badge-success">{`${
                cost ? `$${cost.toFixed(2)}` : "Free"
              }`}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default EventCard;
