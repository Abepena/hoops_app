import EventList from "../components/Events/EventList";
import Header from "../components/Layout/Header";
import PageWrapper from "../components/Layout/PageWrapper";
import { server } from "../config";
import qs from "qs";

function Events({ events }) {
  return (
    <PageWrapper>
      <div className="container mx-auto px-3">
        <h1 className="text-3xl p-4 font-semibold border-b-2">Events</h1>
        <EventList events={events} />
      </div>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${server}/api/events?${query}`);
  const json = await res.json();
  const events = json.data;

  return {
    props: {
      events,
    },
  };
}

export default Events;
