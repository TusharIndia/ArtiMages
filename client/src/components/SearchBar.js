import React from "react";

const SearchBar = ({search,setsearch}) => {
  return (
    <input
      type="text"
      placeholder="Enter the Pic you wanna search....."
      className="h-10 justify-center w-1/2 bg-gray-900 border-2 rounded-md p-2 text-center"
      value={search}
      onChange={(e)=>{setsearch(e.target.value)}}
    />
  );
};

export default SearchBar;
