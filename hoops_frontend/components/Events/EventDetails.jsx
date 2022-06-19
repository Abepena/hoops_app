import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import { LocationMarkerIcon, TicketIcon } from "@heroicons/react/outline";
import { useEventContext } from "contexts/EventContextProvider";

function EventDetails() {
  const { event, location } = useEventContext();
  const { name, cost, date, description } = event.attributes;
  return (
    <div className="event-details p-2 ">
      <div className="mx-4 flex items-center py-2 border-b-2 border-neutral-content mb-2">
        <h2 className="text-2xl font-bold">{name || "Event Name"}</h2>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-3">
          <div className="details mx-4 grid gap-3">
            <h3 className="text-xl font-semi-bold text-orange-600">
              {location.data.attributes.name || "Location Name"}
            </h3>
            <h3 className="font-bold flex items-center">
              <CalendarIcon className="h-6 mr-2" />
              <Moment date={date} format={"LLL"} />
            </h3>

            <h4 className="flex items-center">
              <LocationMarkerIcon className="h-6 mr-2" />
              {location.data.attributes.formatted_address}
            </h4>

            <div className="flex justify-between items-center">
              <span className="flex">
                <TicketIcon className="h-6 mr-2" />
                {cost ? `$${cost.toFixed(2)}` : "Free"}
              </span>
            </div>
          </div>
        </div>
        <div className="grid justify-start ml-4 mt-2 sm:ml-0 sm:mt-0 sm:mr-4 sm:justify-center sm:place-items-center flex-1  ">
          <label
            htmlFor="event-signup-modal"
            className="btn modal-button bg-gradient-to-br from-blue-300 to-success text-neutral border-none"
          >
            Register
          </label>
        </div>
      </div>
      <p className="m-4">{description}</p>
    </div>
  );
}

export default EventDetails;
