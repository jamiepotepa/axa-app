import "./note.scss";
import { NoteData } from "../../types";
import { useDeleteNote } from "../../hooks/useDeleteNote";

type NoteProps = NoteData & {
  // deleteNote: (id: string) => void;
  handleEditNote: (id: string) => void;
};

function Note({ id, title, content, handleEditNote }: NoteProps) {
  const { deleteNote } = useDeleteNote();

  return (
    <div className="note">
      <div className="note__header">
        <h2>{title}</h2>
      </div>
      <div className="note__content">
        <p>{content}</p>
      </div>
      <div className="note__actions">
        <button
          type="button"
          className="note__button note__button--edit"
          onClick={() => handleEditNote(id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="note__button note__button--delete"
          onClick={() => deleteNote(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
