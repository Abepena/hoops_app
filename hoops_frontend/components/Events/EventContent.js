import React from "react";
import EventDetails from "../../components/Events/EventDetails";
import EventMap from "../../components/Events/EventMap";
import { useJsApiLoader } from "@react-google-maps/api";
import EventSignupModal from "components/Modals/EventRegisterModal";

function EventContent({ event }) {
  const { lat, lng } = event.attributes.location.data.attributes;
  const center = {
    lat,
    lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  return (
    <main className="relative -mt-10 rounded-2xl bg-white text-neutral shadow-md overflow-clip mx-4">
      <section className="grid min-h-[500px]">
        <section className="grid lg:grid-cols-2 w-full">
          <div className="details">
            <EventDetails event={event} />
          </div>
          {isLoaded ? <EventMap center={center} /> : <></>}
        </section>
      </section>
    </main>
  );
}

export default EventContent;
