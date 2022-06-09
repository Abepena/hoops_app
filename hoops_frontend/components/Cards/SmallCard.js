import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import costToString from "utils/formatCost";

import { apiServer } from "/config";

function SmallCard({ event }) {
  const { id } = event;
  const { name, date, location, image } = event.attributes;

  return (
    <Link href={`/events/${id}`}>
      <a className="hover:scale-105 mb-2 md:mb-0 cursor-pointer hover:opacity-80  transition transform duration-200 ease-in-out">
        <div className="card bg-base-300 shadow-md hover:shadow-2xl w-96 sm:w-full">
          <figure className="h-96">
            <img
              className="h-full w-full object-cover"
              src={`${apiServer + image.data.attributes.url}`}
              alt="event image"
            />
          </figure>
          <div className="card-body">
            <div className="card-title">{name}</div>
            <h3 className="truncate">{location.data.attributes.name}</h3>
            <Moment fromNow className="text-xs text-gray-400" date={date} />
            <div className="card-actions items-end justify-end">
              <div className="badge badge-success">{`${"Free"}`}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default SmallCard;
