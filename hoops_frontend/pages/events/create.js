import { useState } from "react";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { Formik, Field, Form, setFieldValue } from "formik";

function create() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "200px",
    maxHeight: "400px",
  };

  const [place, setPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  function onPlaceChanged() {
    try {
      const {
        formatted_address,
        geometry: { location },
      } = place.getPlace();
      console.log(formatted_address);
      console.log(location.lat());
      console.log(location.lng());
      const lat = location.lat();
      const lng = location.lng();
      setCenter({ lat, lng });
      setCenter((center) => {
        console.log(center);
        return center;
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="create-location grid place-items-center h-screen">
      <div className="card p-4 rounded-xl border mx-4 w-full max-w-[400px]">
        <h1 className="text-3xl pb-2 border-b-2 mb-2">Create Event</h1>
        {isLoaded ? (
          <Formik
            initialValues={{
              name: "",
              description: "",
              image: "",
            }}
            onSubmit={async (values) => {
              await sleep(500);
              if (place === null) return;

              // exit function if place.getPlace() doesnt work
              try {
                const {
                  formatted_address,
                  geometry: { location },
                } = place.getPlace();
                const address = formatted_address;
                const lat = location.lat();
                const lng = location.lng();

                alert(
                  JSON.stringify({ ...values, address, lat, lng }, null, 2)
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="">
                <div className="flex flex-col mb-2 space-y-2">
                  <label htmlFor="name">Name:</label>
                  <Field
                    className=" outline-none text-sm text-gray-600 placeholder-gray-400"
                    name="name"
                    placeholder="Jane"
                  />
                  <label htmlFor="description">Description:</label>
                  <Field
                    className=" outline-none text-sm text-gray-600 placeholder-gray-400"
                    name="description"
                    placeholder="Enter details here..."
                    as="textarea"
                  />
                  <label htmlFor="img">Image:</label>
                  <Field
                    className=" outline-none text-sm text-gray-600 placeholder-gray-400"
                    name="img"
                    placeholder="Enter details here..."
                    type="file"
                    multiple
                  />
                  <label htmlFor="address">Address:</label>
                  <Autocomplete
                    onLoad={(place) => setPlace(place)}
                    onUnmount={() => setPlace(null)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      className="w-full outline-none text-sm text-gray-600 placeholder-gray-400"
                      name="address"
                      placeholder="100 Main St."
                    />
                  </Autocomplete>
                  <div className={center ? "" : "hidden"}>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={15}
                      onLoad={(map) => setMap(map)}
                      onUnmount={() => setMap(null)}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                      }}
                    >
                      {/* Child components, such as markers, info windows, etc. */}
                      <Marker position={center} />
                    </GoogleMap>
                  </div>
                  <label htmlFor="sport">Sport:</label>
                  <Field
                    className=" outline-none rounded text-sm text-gray-600 placeholder-gray-400 p-3"
                    name="sport"
                    placeholder="Basketball"
                    as="select"
                  >
                    <option value="basketball">🏀 Basketball</option>
                    <option value="football">🏈 Football</option>
                    <option value="soccer">⚽️ Soccer</option>
                    <option value="baseball-softball">
                      ⚾️ Baseball/Softball
                    </option>
                  </Field>
                </div>
                <button
                  className="btn bg-slate-600 text-white px-4 py-2 rounded-xl "
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default create;
