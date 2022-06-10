import PageWrapper from "../../components/Layout/PageWrapper";
import { apiServer, server } from "../../config";
import EventContent from "../../components/Events/EventContent";
import EventRegisterModal from "components/Modals/EventRegisterModal";
import EventHero from "components/Heros/EventHero";
import { EventProvider } from "contexts/EventContextProvider";
import qs from "qs";

const Event = ({ event }) => {
  const img_url = apiServer + event.attributes.image.data.attributes.url;

  return (
    <EventProvider event={event}>
      <PageWrapper>
        <EventHero img_url={img_url} />
          <EventContent />
        <EventRegisterModal />
      </PageWrapper>
    </EventProvider>
  );
};
export async function getServerSideProps(ctx) {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${server}/api/events/${ctx.query.id}?${query}`);
  const json = await res.json();
  const event = json.data;
  return {
    props: { event },
  };
}

export default Event;
