import { Note, BackendNote } from "@/lib/types";
import { mockNotes } from "@/lib/data/mockNotes";
import DataService, { handleApiError } from "./axiosInstance";
import { normalizeNotes } from "../utils";

// This service layer is designed to work with mock data initially
// and can be easily swapped for real API calls in production
// Just replace the function implementations with fetch() calls

let notesData = [...mockNotes];

export const notesService = {
  /**
   * Get all notes
   * @returns Promise resolving to array of notes
   */
  async getNotes(): Promise<Note[]> {
    // // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 300));
    // return notesData;

    try {
      const { data } = await DataService.get<BackendNote[]>("/notes");
      return normalizeNotes(data);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Create a new note
   * @param note Note data without id, createdAt, updatedAt
   * @returns Promise resolving to created note with id and timestamps
   */
  async createNote(
    note: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ): Promise<Note> {
    // // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 500));

    // const newNote: Note = {
    //   ...note,
    //   id: Date.now().toString(),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    // notesData.unshift(newNote);
    // return newNote;

    try {
      const res = await DataService.post<BackendNote>("/notes", note);
      const data = normalizeNotes([res.data]);
      return data[0];
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Update an existing note
   * @param id Note ID
   * @param updates Partial note updates
   * @returns Promise resolving to updated note
   */
  async updateNote(id: string, updates: Partial<Note>): Promise<Note> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const noteIndex = notesData.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }

    const updatedNote = {
      ...notesData[noteIndex],
      ...updates,
      id: notesData[noteIndex].id, // Ensure ID doesn't change
      createdAt: notesData[noteIndex].createdAt, // Ensure createdAt doesn't change
      updatedAt: new Date(),
    };

    notesData[noteIndex] = updatedNote;
    return updatedNote;
  },

  /**
   * Delete a note
   * @param id Note ID
   * @returns Promise resolving when delete is complete
   */
  async deleteNote(id: string): Promise<void> {
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 300));

    // const noteIndex = notesData.findIndex((note) => note.id === id);
    // if (noteIndex === -1) {
    //   throw new Error('Note not found');
    // }

    // notesData.splice(noteIndex, 1);

    try {
      await DataService.delete(`/notes/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Search notes by query string
   * Searches across title, transcription, and keywords
   * @param query Search query string
   * @returns Promise resolving to matching notes
   */
  async searchNotes(query: string): Promise<Note[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!query.trim()) {
      return notesData;
    }

    const lowerQuery = query.toLowerCase();
    return notesData.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.transcription.toLowerCase().includes(lowerQuery) ||
        note.summary.toLowerCase().includes(lowerQuery) ||
        note.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
    );
  },
};
