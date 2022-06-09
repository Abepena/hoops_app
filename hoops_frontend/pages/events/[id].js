import PageWrapper from "../../components/Layout/PageWrapper";
import { server } from "../../config";
import EventContent from "../../components/Events/EventContent";
import EventRegisterModal from "components/Modals/EventRegisterModal";
import EventHero from "components/Heros/EventHero";
import { useState, useEffect } from "react";
import axios from "axios";

const Event = ({ event }) => {
  return (
    <PageWrapper>
      <EventHero img_url={event.img_url} title={event.name} />
      <div className="container mx-auto">
        <EventContent event={event} />
      </div>
      <EventRegisterModal />
    </PageWrapper>
  );
};
export async function getServerSideProps(ctx) {
  // Get event by id
  const res = await fetch(`${server}/api/events/${ctx.query.id}`);
  const json = await res.json();
  const { event } = json;
  return {
    props: { event },
  };
}

export default Event;
