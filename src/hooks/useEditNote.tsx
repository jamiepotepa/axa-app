import { API_URL } from "./useFetchNotes";
import { useAppContext } from "../context/appContext";

export function useEditNote() {
  const { notes, setNotes, setLoading, setError } = useAppContext();

  async function editNote(
    id: string,
    editData: { title: string; content: string }
  ) {
    console.log("edit note hook");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editData.title,
          content: editData.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong when editing a note");
      }

      // NOTE: As an optimistic approach I am adding notes here, for a production site it would be better to fetch
      // the new notes from the server to keep the data in sync
      // setNotes(notes.filter((note) => note.id !== id));
      // setNotes((prevNotes) =>
      //   prevNotes.map((note) => (note.id === id ? { ...note, ...data } : note))
      // );

      setNotes(
        notes.map((note) => (note.id === id ? { ...note, ...editData } : note))
      );
      // fetchNotes();
    } catch (error) {
      setError(
        "We could not edit your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { editNote };
}

// export async function editNote(
//   id: string,
//   editData: { title: string; content: string }
// ) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: editData.title,
//       content: editData.content,
//     }),
//   });
//   if (!response.ok) {
//     throw new Error("Something went wrong when deleting a note");
//   }
// }
