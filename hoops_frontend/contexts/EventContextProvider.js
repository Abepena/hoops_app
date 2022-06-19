import { createContext, useContext, useState } from "react";
import http from "config/http";
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
  const [eventId, setEventId] = useState(props.event.id);
  const [image, setImage] = useState(event.attributes.image);
  const [location, setLocation] = useState(event.attributes.location);
  const [spots, setSpots] = useState(event.attributes.spots);
  const [participants, setParticipants] = useState(
    event.attributes.participants
  );
  const createNewEvent = async (data) => {
    return await http.post(`/api/events`, data);
  };
  // update a Event entry
  const updateEvent = async (id, data) => {
    return await http.put(`/api/events/${id}`, data);
  };
  // delete a Event entry
  const deleteEvent = async (id) => {
    return await http.delete(`/api/events/${id}`);
  };
  // change navigation value
  const changeNavValue = (value) => {
    set_nav_value(value);
  };
  // get Event id value
  const getEventId = (id) => {
    setEventId(id);
  };

  const EventContextValue = {
    event,
    setEvent,
    location,
    setLocation,
    image,
    setImage,
    participants,
    spots,
    setSpots,
    setParticipants,
    createNewEvent,
    updateEvent,
    deleteEvent,
    changeNavValue,
    getEventId,
  };

  return <EventContext.Provider value={EventContextValue} {...props} />;
};

export { EventProvider, useEventContext };
