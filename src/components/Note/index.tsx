import "./note.scss";

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

export default Note;
