import PageWrapper from "../../components/Layout/PageWrapper";
import EventContent from "../../components/Events/EventContent";
import EventRegisterModal from "components/Modals/EventRegisterModal";
import EventHero from "components/Heros/EventHero";
import { EventProvider } from "contexts/EventContextProvider";
import qs from "qs";
import { getImageURL } from "utils/getImageURLs";
import { WizardProvider } from "contexts/WizardContextProvider";

const Event = ({ event }) => {
  const img_url = getImageURL(event.attributes.image);

  return (
    <EventProvider event={event}>
      <PageWrapper>
        <EventHero img_url={img_url} />
        <EventContent />
        <WizardProvider>
          <EventRegisterModal />
        </WizardProvider>
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/events/${ctx.query.id}?${query}`;
  const res = await fetch(url);
  const json = await res.json();
  const event = json.data;
  return {
    props: { event },
  };
}

export default Event;
