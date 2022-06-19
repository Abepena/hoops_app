import EventList from "../components/Events/EventList";
import Drawer from "components/Navbars/Drawer";
import qs from "qs";
import EventFilterDropdown from "components/Dropdowns/EventFilterDropDown";

function Events({ events }) {
  return (
    <Drawer>
      <div className="container mx-auto max-w-6xl xl:max-w-8xl mt-4">
        <div className="header p-4 flex items-center border-b-2 border-neutral-content mb-4">
          <h1 className="flex-1 text-3xl font-semibold">Events</h1>
          <EventFilterDropdown />
          {/* <div className="btn btn-ghost w-10">
            <i class="fa-solid fa-filter text-2xl"></i>
          </div> */}
        </div>
        {/* Event Filter Box */}
        <EventList events={events} />
      </div>
    </Drawer>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: "*",
      sort: ["date"],
      pagination: {
        start: 0,
        limit: 25,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events?${query}`
  );
  const json = await res.json();
  const events = json.data;

  return {
    props: {
      events,
    },
  };
}

export default Events;
