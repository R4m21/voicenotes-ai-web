import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BackendNote, Note } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeNotes(notes: BackendNote[]): Note[] {
  return notes.map((note: BackendNote) => ({
    id: note._id,
    title: note.title,
    transcription: note.transcription,
    summary: note.summary,
    actionItems: note.actionItems,
    keywords: note.keywords,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }));
}
