import React, { useState } from "react";
import ProfileInfo from "../profileInfo/ProfileInfo";
import SearchBar from "../searchBar/Search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
  };
  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium py-2 text-black">Notes</h2>
      <SearchBar
        value={searchQuery}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        onChange={({ target }) => setSearchQuery(target.value)}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
