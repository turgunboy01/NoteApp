import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/profileInfo/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNoteStore } from "../../store/noteStore";
import moment from "moment";
import img from "../../assets/img.png";
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const { notes, allNotes, isPinned, deleteNote, searchNote } = useNoteStore();

  // console.log(searchNote, "note navbar");

  useEffect(() => {
    allNotes();
  }, []);

  const allNote = notes?.notes || []; // ✅ Agar `notes.notes` yo‘q bo‘lsa, bo‘sh massiv qaytariladi

  const filteredNotes = allNote.filter((f) =>
    f.title?.toLowerCase().includes(searchNote.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="h-full">
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {filteredNotes.map((note, index) => (
                <NoteCard
                  key={index}
                  title={note.title}
                  date={moment(note.createOn).format("DD MMM YYYY")} // ✅ Sana formatlandi
                  content={note.content}
                  tags={note.tags}
                  inPinned={note.isPinned}
                  onEdit={() =>
                    setOpenAddEditModal({
                      isShow: true,
                      type: "edit",
                      data: note,
                    })
                  }
                  onDelate={() => {
                    deleteNote(note._id);
                  }}
                  onPinNote={() => {
                    console.log("s", note.isPinned);
                    isPinned(note._id, note.isPinned);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col w-full gap-5 pt-20">
              <img
                src={img}
                className=" max-w-[200px] sm:max-w-[300px] w-full"
                alt=""
              />
              <p className=" xl:w-2/4 text-center">
                Start creating your first note! Click the 'Add' button to jot
                down your thoughts,ideas and reminders. Let's get started!{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Button */}
      <button
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <MdAdd size={32} className="text-white" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", data: null })
        } // ✅ Modal yopilishi to‘g‘ri ishlaydi
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className={
          "md:w-[40%] w-[90%]  max-h-3/4 bg-white rounded-md mx-auto  mt-14 p-5 overflow-hidden "
        }
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
        />
      </Modal>
    </div>
  );
};

export default Home;
