import { useEffect, useState, ChangeEvent } from "react";
import debounce from "debounce";

import Header from "./components/Header";
import SearchAndFilter from "./components/SearchAndFilter";
import Note from "./components/Note";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";
import { NoteData } from "./types";

//TODO
// Need error handling if a fetch fails. Some sort of message. !ok
// Move fetches to hooks?
// Add edit note functionality - If I do, make sure to change the submit button text to read update
// update Readme to explain how to run the app and give some explanation of the code
// Change search-and-filter naming to search if I don't implement the filter
// Adding a note clears the search text ???? - this would require hooking up the search state and passing it down. Debounce doesn't work well with this
// Clean up debounce if component gets unmounted?
//? Maybe the filter could switch between searching the title of content of each note

//? Check typescript for onClick events etc

//* Separate components and styles
//* Cancel button in the modal needs to clear the form and close the modal
//* Take out case for search
//* Add search functionality - use Debounce
//*  Put header section and filter into their own components?

// interface NoteData {
//   id: string;
//   title: string;
//   content: string;
// }

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  // Use this to set and pass the active note through to the modal for editing
  // const [activeNote, setActiveNote] = useState<NoteData | null>(null);

  async function fetchNotes() {
    console.log("fetchNotes");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/notes");

      if (!response.ok) {
        throw new Error("Something went wrong when fetching data");
      }
      const data: NoteData[] = await response.json();

      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("This always runs");
      setLoading(false);
    }
  }

  async function addNote(data: { title: string; content: string }) {
    try {
      setLoading(true);

      const id = crypto.randomUUID();
      const response = await fetch("http://localhost:5000/notes", {
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

      setNotes([...notes, { id, ...data }]);

      // fetchNotes();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: string) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Something went wrong when deleting a note");
      }

      // fetchNotes();
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce((text: string) => setSearchText(text), 300)(e.target.value);
  };

  // ?? useMemo and useCallback examples, a bit overkill for this app
  // const filteredNotes2 = useMemo(() => {
  //   return notes.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()));
  // }, [notes, searchText]);

  // const handleSearchOnChange2 = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     debounce((text: string) => setSearchText(text), 500)(e.target.value);
  //   },
  //   []
  // );

  // ?? Better to do the useMemo approach below or the early return for no notes?
  // ?? Currently I am just doing the logic in the main return
  // const noNotes = useMemo(() => {
  //   if (notes.length === 0) {
  //     return (
  //       <div>
  //         <p>
  //           Looks like you don't have any notes! Click add note in the top right
  //         </p>
  //          {loading && <LoadingSpinner />}
  //       </div>
  //     );
  //   }
  // }, [notes]);

  // if (notes.length === 0) {
  //   return (
  //     <div>
  //       <p>
  //         Looks like you don't have any notes! Click add note in the top right
  //       </p>
  //       {loading && <LoadingSpinner />}
  //     </div>
  //   );
  // }

  return (
    <div>
      <Header showModal={setShowModal} />
      <div className="content inner">
        <SearchAndFilter handleSearchOnChange={handleSearchOnChange} />
        {/* {noNotes} */}
        {notes.length === 0 ? (
          <div>
            <p>
              Looks like you don't have any notes! Add a note by clicking the
              add note button up there in the top right
            </p>
            {loading && <LoadingSpinner />}
          </div>
        ) : (
          <div className="notes-container">
            {loading && <LoadingSpinner />}
            {filteredNotes.map(({ id, title, content }) => (
              <Note
                key={id}
                title={title}
                content={content}
                id={id}
                deleteNote={deleteNote}
              />
            ))}
            {filteredNotes.length === 0 && <p>No notes found</p>}
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} addNote={addNote} />
      )}
    </div>
  );
}

export default App;
