import { API_URL } from "./useFetchNotes";
import { useAppContext } from "../context/appContext";

export function useDeleteNote() {
  const { notes, setNotes, setLoading, setError } = useAppContext();

  async function deleteNote(id: string) {
    console.log("deleteNote hook");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Something went wrong when deleting a note");
      }

      // NOTE: As an optimistic approach I am adding notes here, for a production site it would be better to fetch
      // the new notes from the server to keep the data in sync
      setNotes(notes.filter((note) => note.id !== id));
      // fetchNotes();
    } catch (error) {
      setError(
        "We could not delete your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { deleteNote };
}
