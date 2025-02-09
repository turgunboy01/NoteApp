import React, { useState } from "react";
import ProfileInfo from "../profileInfo/ProfileInfo";
import SearchBar from "../searchBar/Search";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useNoteStore } from "../../store/noteStore";

const Navbar = () => {
  const { searchNote, setSearchNote } = useNoteStore();
  const { logout } = useAuthStore();

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };
  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchNote("");
  };


  // console.log(authUser);

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium py-2 text-black">Notes</h2>
      <SearchBar
        value={searchNote}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        onChange={({ target }) => setSearchNote(target.value)}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
