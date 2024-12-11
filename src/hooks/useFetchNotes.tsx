import { useEffect } from "react";
import { NoteData } from "../types";
import { useAppContext } from "../context/appContext";

export const API_URL = "http://localhost:5000/notes";

export function useFetchNotes() {
  // const { notes, setNotes, loading, setLoading, error, setError } =
  //   useAppContext();

  const { setNotes, setLoading, setError } = useAppContext();
  // const [notes, setNotes] = useState<NoteData[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  async function fetchNotes() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Something went wrong when fetching data");
      }

      const data: NoteData[] = await response.json();
      setNotes(data);
    } catch (error) {
      setError(
        "We were unable to fetch your notes. Please refresh the page and try again"
      );
      // setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("fetch hook");
    fetchNotes();
  }, []);

  // return { notes, setNotes, loading, setLoading, error, setError };
  //
  // return { fetchNotes };
}
