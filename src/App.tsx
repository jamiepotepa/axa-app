import { useEffect, useState, ChangeEvent, useRef } from "react";
import debounce from "debounce";

import { NoteData } from "./types";
import Header from "./components/Header";
import Search from "./components/Search";
import LoadingSpinner from "./components/LoadingSpinner";
import Modal from "./components/Modal";
import Form from "./components/Form";
import NotesContainer from "./components/NotesContainer";

import {
  fetchNotes as fetchAllNotes,
  addNote as addNewNote,
  deleteNote as deleteNoteById,
  editNote as editNoteById,
} from "./api";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<NoteData | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  async function fetchNotes() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllNotes();

      setNotes(data);
    } catch (error) {
      setError(
        "We were unable to fetch your notes. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addNote(data: { title: string; content: string }) {
    setLoading(true);
    setError(null);

    try {
      const newNote = await addNewNote(data);
      // NOTE: As an optimistic approach I am adding notes here, for a production site it would be better to fetch
      // the new notes from the server to keep the data in sync
      setNotes((prevNotes) => [...prevNotes, newNote]);
      // await fetchNotes();
    } catch (error) {
      setError(
        "We could not add your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: string) {
    setLoading(true);
    setError(null);

    try {
      await deleteNoteById(id);
      // NOTE: As an optimistic approach I am filtering the notes here, for a production site it would be better to fetch
      // the new notes from the server to keep the data in sync
      setNotes(notes.filter((note) => note.id !== id));
      // await fetchNotes();
    } catch (error) {
      setError(
        "We could not delete your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editNote(
    id: string,
    data: { title: string; content: string }
  ) {
    setLoading(true);
    setError(null);

    try {
      await editNoteById(id, data);
      // NOTE: As an optimistic approach I am updating the notes here, for a production site it would be better to fetch
      // the new notes from the server to keep the data in sync
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, ...data } : note))
      );
      // await fetchNotes();
    } catch (error) {
      setError(
        "We could not edit your not. Please refresh the page and try again"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce((text: string) => setSearchText(text), 300)(e.target.value);
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (!noteToEdit) return;
    setShowModal(true);
    setActiveNote(noteToEdit);
  };

  const handleAddNote = () => {
    searchRef.current!.value = "";
    setSearchText("");
    setActiveNote(null);
    setShowModal(true);
  };

  const modalTitle = activeNote ? "Edit a note" : "Add a note";

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <Header addNote={handleAddNote} />
      <div className="content inner">
        <Search handleSearchOnChange={handleSearchOnChange} ref={searchRef} />
        {error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : (
          <NotesContainer
            notes={notes}
            searchText={searchText}
            deleteNote={deleteNote}
            handleEditNote={handleEditNote}
          />
        )}
      </div>
      {showModal && (
        <Modal title={modalTitle} onClose={() => setShowModal(false)}>
          <Form
            onClose={() => setShowModal(false)}
            addNote={addNote}
            editNote={editNote}
            activeNote={activeNote}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
