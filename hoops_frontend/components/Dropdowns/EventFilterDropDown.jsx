import { useSession, signOut } from "next-auth/react";
import React from "react";

function EventFilterDropdown() {
  const { data: session } = useSession();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost">
        <i class="fa-solid fa-filter text-2xl"></i>
      </label>
      <ul
        tabIndex="0"
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box max-w-xs justify-center"
      >
        <li>
          <a className="">
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

export default EventFilterDropdown;
