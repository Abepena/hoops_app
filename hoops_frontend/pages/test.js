import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        Session Data: {"{" + JSON.stringify(session) + "}"}
        <button className="btn btn-success" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="btn btn-success" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
