import Head from "next/head";
import Banner from "../components/Layout/Banner";
import Main from "../components/Layout/Main";
import Link from "next/link";
import PageWrapper from "../components/Layout/PageWrapper";
import { server } from "../config";
import IndexHero from "components/Heros/IndexHero";
import ContactModal from "components/Modals/ContactModal";

export default function Home({ events }) {
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
  const res = await fetch(`${server}/api/events/upcoming`);
  const json = await res.json();
  const { events } = json;

  return {
    props: { events },
  };
}
