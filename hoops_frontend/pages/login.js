import UserLoginForm from "components/Forms/UserLoginForm";
import Drawer from "components/Navbars/Drawer";
import { useSession } from "next-auth/react";
import React from "react";

function login() {
  const { data: session } = useSession();
  return (
    <Drawer>
      <div className="box h-1/2 max-w-lg border mx-auto text-wrap">
        {JSON.stringify(session)}
      </div>
      <UserLoginForm />
    </Drawer>
  );
}

export default login;
