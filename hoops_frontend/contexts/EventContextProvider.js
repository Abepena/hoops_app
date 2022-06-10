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
  const [event, setEvent] = useState(props.event);
  const { image, location, participants } = event.attributes;

  const EventContextValue = {
    event,
    location,
    participants,
    image,
  };

  return <EventContext.Provider value={EventContextValue} {...props} />;
};

export { EventProvider, useEventContext };
