import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { useNoteStore } from "../../store/noteStore";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  inPinned,
  onEdit,
  onDelate,
  noteId,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${inPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs mt-2 text-slate-600">{content.slice(0, 60)}</p>

      <div className="flex items-center justify-between gap-2 mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((tag) => `#${tag} `)}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onEdit}>
            <MdCreate className="icon-btn hover:text-green-500" />
          </button>
          <button onClick={onDelate}>
            <MdDelete className="icon-btn hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
