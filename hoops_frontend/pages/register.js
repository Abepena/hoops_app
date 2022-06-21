import UserRegisterForm from "components/Forms/UserRegisterForm";
import Drawer from "components/Navbars/Drawer";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

export default function register() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Pure Hoops</title>
        <meta name="description" content="Pure Hoops Basketball Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          Session Data: {"{" + JSON.stringify(session) + "}"}
          <button className="btn " onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <Drawer>
            <UserRegisterForm />
            <button
              className="btn btn-success"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
          </Drawer>
        </>
      )}
    </>
  );
}
