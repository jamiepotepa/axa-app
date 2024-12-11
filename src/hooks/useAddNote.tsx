import { API_URL } from "./useFetchNotes";
// import { NoteData } from "../types";
import { useAppContext } from "../context/appContext";

export function useAddNote() {
  const { notes, setNotes, setLoading, setError } = useAppContext();

  async function addNote(data: { title: string; content: string }) {
    console.log("addNote hook");
    setLoading(true);
    const id = crypto.randomUUID();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: data.title,
          content: data.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong when adding a note");
      }
      // setNotes((prevNotes: NoteData[]) => [...prevNotes, { id, ...data }]);

      setNotes([...notes, { id, ...data }]);
    } catch (error) {
      setError(
        "We could not add your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { addNote };
}
// export async function addNote(data: { title: string; content: string }) {
//   try {
//     setLoading(true);

//     const id = crypto.randomUUID();
//     const response = await fetch("http://localhost:5000/notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id,
//         title: data.title,
//         content: data.content,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Something went wrong when adding a note");
//     }

//     // NOTE: As an optimistic approach I am adding notes here, for a production site it would be better to fetch
//     // the new notes from the server to keep the data in sync
//     setNotes([...notes, { id, ...data }]);
//     // fetchNotes();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// }
