import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FaLocationArrow } from "react-icons/fa";

function EventMap({ center }) {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    maxHeight: "800px",
  };
  const [map, setMap] = useState(null);

  return (
    <div className="map relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onUnmount={() => setMap(null)}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />
        <button
          className="absolute z-50 bottom-48 right-2 bg-white p-3 text-xl rounded-full"
          onClick={() => map.panTo(center)}
        >
          <FaLocationArrow />
        </button>
      </GoogleMap>
    </div>
  );
}

export default EventMap;
