import Note from "../model/note.model.js";

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;
  try {
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();
    res.status(201).json({ success: true, message: "note added sucessfully" });
  } catch (error) {
    console.log("Create error", error);
  }
};

export const updateNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;
  const noteId = req.params.noteId;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ success: false, message: "No change provider" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not Found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    res.status(200).json({
      success: true,
      note,
      message: "note update successfully",
    });
  } catch (error) {}
};

export const allNotes = async (req, res) => {
  const user = req.user;

  const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
  return res.status(200).json({ success: true, notes, message: "All Notes" });
};

export const updatePinned = async (req, res) => {
  const { isPinned } = req.body;
  const user = req.user;
  const noteId = req.params.noteId;

  try {
    // ✅ 1. Note mavjudligini tekshiramiz
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    // ✅ 2. isPinned ni faqat true yoki false bo‘lsa o‘zgartiramiz
    note.isPinned = isPinned;
    await note.save();

    return res
      .status(200)
      .json({ success: true, note, message: "Note pin status updated" });
  } catch (error) {
    console.error("Error pinning note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
export const deletePinned = async (req, res) => {
  //   const { isPinned } = req.body;
  const user = req.user;
  const noteId = req.params.noteId;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  await note.deleteOne();
  res.status(200).json({ success: true, message: "deleted note" });
};
