// import { useState } from "react";
// import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import BounceLoader from "react-spinners/BounceLoader";

//TODO
// Need error handling if a fetch fails. !ok
// Move fetches to hooks?
// Separate components and styles
// Add edit note functionality
// Add search functionality - use Debounce
interface NoteData {
  id: string;
  title: string;
  content: string;
}

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
              add note button in the top right
            </p>
            {loading && <Loading />}
          </div>
        ) : (
          <div className="notes-container">
            {loading && <Loading />}
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

type NoteProps = {
  deleteNote: (id: string) => void;
  id: string;
  title: string;
  content: string;
};

function Note({ id, title, content, deleteNote }: NoteProps) {
  return (
    <div className="note">
      <div className="note__header">
        <h2>{title}</h2>
      </div>
      <div className="node__content">
        <p>{content}</p>
      </div>
      <div className="note__actions">
        <button className="note__button note__button--edit">Edit</button>
        <button
          className="note__button note__button--delete"
          onClick={() => deleteNote(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  addNote: (data: { title: string; content: string }) => void;
  // onSave: () => void;
};

function Modal({ onClose, addNote }: ModalProps) {
  // // ! DO I NEED THIS OR CAN I JUST INLINE IT?
  // const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  // };

  const [error, setError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();

    // Fallback if required is removed from the input fields
    if (!titleRef.current?.value || !contentRef.current?.value) {
      setError(true);
      return;
    }

    setError(false);

    const data = {
      title: sanitiseInput(titleRef.current!.value),
      content: sanitiseInput(contentRef.current!.value),
    };

    addNote(data);
    console.log(data);

    // OR SHALL I JUST CLOSE THE FOdRM ?
    // (e.target as HTMLFormElement).reset();

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <RxCross1 />
        </button>
        <div className="modal__header">
          <h2>Add a new note</h2>
        </div>
        <div className="modal__body">
          <form onSubmit={handleSubmit}>
            <div className="modal__input-container">
              <input
                required
                type="text"
                placeholder="Title ..."
                className="modal__input"
                ref={titleRef}
              />
              <textarea
                required
                rows={4}
                placeholder="Note content ..."
                className="modal__text-area"
                ref={contentRef}
              ></textarea>
            </div>
            {error && (
              <div className="modal__error-container">
                <p className="modal__error">Please fill in all fields</p>
              </div>
            )}
            <div className="modal__button-container">
              <button className="modal__button modal__button--cancel">
                Cancel
              </button>
              <button className="modal__button" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="loading">
      <BounceLoader />
    </div>
  );
}

// Helper function for a basic sanitisation of input
function sanitiseInput(input: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = input;
  return tempDiv.innerHTML.trim();
}
