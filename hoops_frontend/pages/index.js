import Head from "next/head";
import Main from "../components/Layout/Main";
import PageWrapper from "../components/Layout/PageWrapper";
import IndexHero from "components/Heros/IndexHero";
import ContactModal from "components/Modals/ContactModal";
import qs from "qs";

export default function Home({ events }) {
  //TODO: Fix small card margins
  return (
    <PageWrapper>
      <Head>
        <title>Pure Hoops</title>
        <meta name="description" content="Pure Hoops Basketball Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexHero />
      <Main upcomingEvents={events} />
      <ContactModal />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const today = new Date();
  const query = qs.stringify(
    {
      fields: ["name", "date", "cost"],
      populate: ["location", "image"],
      filters: {
        date: {
          $gte: today,
        },
      },
      sort: ["date"],
      pagination: {
        start: 0,
        limit: 5,
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
    props: { events },
  };
}
