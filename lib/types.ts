export interface ActionItem {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  transcription: string;
  summary: string;
  actionItems: ActionItem[];
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  searchNotes: (query: string) => Promise<Note[]>;
}

export interface AiAnalysis {
  summary: string;
  actionItems: ActionItem[];
  keywords: string[];
}

export type BackendNote = Omit<Note, "id"> & {
  _id: string;
  userId: string;
};