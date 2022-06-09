import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "") return
    alert(JSON.stringify(search));
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form
      className="flex items-center border-2 h-10 rounded-full p-1"
      onSubmit={handleSubmit}
    >
      <input
        className="flex grow pl-4 sm:pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className="">
        <SearchIcon
          onClick={handleSubmit}
          className="hidden md:inline bg-orange-600 p-1 rounded-full h-6 text-white cursor-pointer"
        />
      </button>
    </form>
  );
}

export default Search;
