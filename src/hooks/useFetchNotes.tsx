import { NoteData } from "../types";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:5000/notes";

// export async function fetchNotes() {
//   console.log("fetchNotes API");
//   const response = await fetch(API_URL);

//   if (!response.ok) {
//     throw new Error("Something went wrong when fetching data");
//   }
//   const data: NoteData[] = await response.json();

//   return data;
// }

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("hook fetching notes");
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data: NoteData[] = await response.json();
        setNotes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading, error };
};
