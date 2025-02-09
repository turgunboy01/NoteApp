import { create } from "zustand";
import axiosInstance from "../utils/axiosInstants";
import toast from "react-hot-toast";

export const useNoteStore = create((set, get) => ({
  notes: [],
  isNotesLoading: false,
  searchNote: "",

  setSearchNote: (query) => set({ searchNote: query }),
  // ✅ Barcha notalarni olish
  allNotes: async () => {
    set({ isNotesLoading: true });
    try {
      const res = await axiosInstance.get(`/note/notes`);
      set({ notes: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch notes!");
    } finally {
      set({ isNotesLoading: false });
    }
  },

  // ✅ Yangi nota qo‘shish
  addNewNote: async (title, content, tags) => {
    try {
      await axiosInstance.post("/note/create", {
        title,
        content,
        tags,
      });
      toast.success("Note added successfully!");
      get().allNotes(); // Eslatmalarni yangilash
    } catch (error) {
      toast.error(error.response?.message || "Failed to add note");
    }
  },
  editNote: async (noteId, title, content, tags) => {
    try {
      await axiosInstance.post(`/note/edit/${noteId}`, {
        title,
        content,
        tags,
      });
      toast.success("Note added successfully!");
      get().allNotes(); // Eslatmalarni yangilash
    } catch (error) {
      toast.error(error.response?.message || "Failed to update note");
    }
  },
  deleteNote: async (noteId) => {
    try {
      await axiosInstance.delete(`/note/delete/${noteId}`);
      toast.success("Note revomed successfully!");

      get().allNotes(); // Eslatmalarni yangilash
    } catch (error) {
      toast.error(error.response?.message || "Failed to removed note");
    }
  },

  // ✅ PIN statusini o'zgartirish
  isPinned: async (noteId, current) => {
    try {
      const newPinnedState = !current; // ✅ Aks holatga o‘tkazish

      await axiosInstance.put(`/note/isPinned/${noteId}`, {
        isPinned: newPinnedState,
      });

      get().allNotes();

      toast.success("Note pinned successfully!");
    } catch (error) {
      toast.error("Failed to pin the note!");
    }
  },
}));
