import React from "react";

function NavbarSearch(props) {
  return (
    <div className={`${props.className} form-control`}>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
      />
    </div>
  );
}

export default NavbarSearch;
