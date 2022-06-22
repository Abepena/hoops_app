import { signOut, useSession } from "next-auth/react";
import React from "react";

function UserDropdown({ end }) {
  const {
    data: {
      user: { image },
      providerImage,
    },
  } = useSession();
  return (
    <div className={`dropdown ${end && "dropdown-end"}`}>
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={image || providerImage || "/default-avatar.png"} />
        </div>
      </label>
      <ul
        tabIndex="0"
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 justify-center"
      >
        <li>
          <a className="justify-center">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li onClick={() => signOut()}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default UserDropdown;
