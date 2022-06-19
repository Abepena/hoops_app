import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "/styles/tailwind.css";
import "/styles/globals.css";

import { SessionProvider } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";

const progress = new ProgressBar({
  size: 4,
  color: "#37D399",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
