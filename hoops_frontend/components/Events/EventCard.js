
import React from "react";
import Moment from "react-moment";
import Link from "next/link";
import costToString from "utils/costToString";
import Image from "next/image";


function EventCard({ event: { name, event_date, location, id, img_url, cost },}) {
  const date = new Date(event_date).getTime();
  return (
    <Link href={`/events/${id}`}>
      <a className="hover:scale-105 mb-2 md:mb-0 cursor-pointer hover:shadow-md hover:opacity-80 transition transform duration-200 ease-in-out">
        <div className="bg-base-300 shadow-2xl card w-96 sm:w-full">
          <figure className="h-96">
            <img 
              className="h-full w-full object-cover"
              src={`${img_url}`}
              alt="event image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <h3 className="truncate">{location.name}</h3>
            <Moment fromNow className="text-xs text-gray-400" date={date} />
            <div className="card-actions items-end justify-end">
              <div className="badge badge-success">{`${
                cost ? costToString(cost) : "Free"
              }`}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}


export default EventCard;
