import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

function EventList({ events }) {

  return (
    <div className="pt-4 grid justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8  ">
      {events &&
        events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

export default EventList;
