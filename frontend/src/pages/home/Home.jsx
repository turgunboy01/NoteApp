import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/profileInfo/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"Meeting on 7th Aprill"}
            date={"3rd Apr 2024"}
            content={"Meetingon 7th Aprill Meeting on 7th April"}
            tags={"#Meeting"}
            inPinned={true}
            onEdit={() => {}}
            onDelate={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <MdAdd size={32} className="text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className={
          "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
        }
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;
