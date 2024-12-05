import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

import { NoteData } from "./types";
import Note from "./components/Note";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";

//TODO
// Need error handling if a fetch fails. Some sort of message. !ok
// Move fetches to hooks?
// Add edit note functionality - If I do, make sure to change the submit button text to read update
// Add search functionality - use Debounce
// Cancel button in the modal needs to clear the form and close the modal
// update Readme to explain hos to run the app and give some explanation of the code
// Clicking return in the note should post ?

//* Separate components and styles

// interface NoteData {
//   id: string;
//   title: string;
//   content: string;
// }

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(false);
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

  // const noNotes = useMemo(() => {
  //   if (notes.length === 0) {
  //     return (
  //       <div>
  //         <p>
  //           Looks like you don't have any notes! Click add note in the top right
  //         </p>
  //       </div>
  //     );
  //   }
  // }, [notes]);

  return (
    <div>
      <div className="header">
        <div className="header__inner inner">
          <div className="header__title">
            <h1>Simple Notes</h1>
          </div>
          <div className="header__actions">
            <button
              className="header__button button"
              onClick={() => setShowModal(true)}
            >
              Add note
              <RxCross1 className="header__button-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="content inner">
        <div className="search-and-filter">
          <input
            type="text"
            placeholder="Search notes..."
            className="search-and-filter__search"
          />

          <div className="search-and-filter__filter">
            <select>
              <option value="all">All</option>
              <option value="important">Important</option>
            </select>
          </div>
        </div>
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
            {notes.map(({ id, title, content }) => (
              // <Note key={note.id} title={note.title} content={note.content} />
              <Note
                key={id}
                title={title}
                content={content}
                id={id}
                deleteNote={deleteNote}
              />
            ))}
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
