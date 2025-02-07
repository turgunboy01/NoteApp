import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Notes Search"
        className="w-full text-xs bg-transparent py-[11px]  outline-none"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-xl text-slate-500 cursor-pointer mr-3 hover:text-black"
        />
      )}
      <FaMagnifyingGlass
        className=" text-xl text-slate-500 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
