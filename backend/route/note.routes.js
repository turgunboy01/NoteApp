import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  allNotes,
  createNote,
  deletePinned,
  updateNote,
  updatePinned,
} from "../controls/note.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createNote);
router.post("/edit/:noteId", protectRoute, updateNote);
router.put("/isPinned/:noteId", protectRoute, updatePinned);
router.delete("/delete/:noteId", protectRoute, deletePinned);

router.get("/notes", protectRoute, allNotes);

export default router;
