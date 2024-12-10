import Note from "../Note";
import { NoteData } from "../../types";
import "./notes-container.scss";

type NotesContainerProps = {
  notes: NoteData[];
  searchText: string;
  deleteNote: (id: string) => void;
  handleEditNote: (id: string) => void;
};

function NotesContainer({
  notes,
  searchText,
  deleteNote,
  handleEditNote,
}: NotesContainerProps) {
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (notes.length === 0) {
    return (
      <div>
        <p>Looks like you don't have any notes!</p>
        <p>
          Add a note by clicking the add note button up there in the top right
        </p>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {filteredNotes.map(({ id, title, content }) => (
        <Note
          key={id}
          title={title}
          content={content}
          id={id}
          deleteNote={deleteNote}
          handleEditNote={handleEditNote}
        />
      ))}
      {filteredNotes.length === 0 && <p>Your search has returned no results</p>}
    </div>
  );
}

export default NotesContainer;
