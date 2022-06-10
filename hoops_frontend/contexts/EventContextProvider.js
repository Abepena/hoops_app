import { createContext, useContext, useState } from "react";

const EventContext = createContext(undefined);
const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }

  return context;
};

const EventProvider = (props) => {
  const [event, setEvent] = useState(props.event || {});
  const [location, setLocation] = useState(
    props.event.attributes.location || {}
  );
  const [image, setImage] = useState(props.event.attributes.image || {});

  const EventContextValue = {
    event,
    location,
    setLocation,
    image,
    setImage,
  };

  return <EventContext.Provider value={EventContextValue} {...props} />;
};

export { EventProvider, useEventContext };
