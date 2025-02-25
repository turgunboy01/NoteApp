import React, { useEffect, useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import { useNoteStore } from "../../store/noteStore";

const AddEditNote = ({ onClose, noteData, type }) => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNewNote, editNote } = useNoteStore();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
    }
  }, [noteData]);

  const handleSave = () => {
    if (!title) {
      setError("please enter the title");
      return;
    }
    if (!content) {
      setError("please enter the contents");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote(noteData._id, title, content, tags);
    } else {
      addNewNote(title, content, tags);
    }
    onClose();
  };

  

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute -right-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className=" text-xl outline-none text-slate-950 border border-slate-100 p-2 rounded"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className=" text-sm outline-none text-slate-950 border border-slate-100 bg-slate-50 p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          rows={10}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <span className="text-red-500 text-xs pt-4">{error}</span>}

      <button
        className="w-full h-14 flex items-center justify-center text-white bg-primary font-medium p-3 mt-5"
        onClick={handleSave}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNote;
