import { ReactNode, createContext, useContext, useState } from "react";
import { NoteData } from "../types";

type AppProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
  // const [notes, setNotes] = useState<NoteData[]>([]);
  const [notes, setNotes] = useState([] as NoteData[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{ notes, setNotes, loading, setLoading, error, setError }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to access the context
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
