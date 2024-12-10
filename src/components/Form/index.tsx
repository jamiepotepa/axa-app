import { FormEvent, useEffect, useRef, useState } from "react";
import "./form.scss";
import { NoteData } from "../../types";

import { sanitiseInput } from "../../utils/sanitise";

type FormProps = {
  onClose: () => void;
  addNote: (data: { title: string; content: string }) => void;
  editNote: (id: string, data: { title: string; content: string }) => void;
  activeNote: NoteData | null;
};

function Form({ onClose, addNote, editNote, activeNote }: FormProps) {
  // const [title, setTitle] = useState(activeNote?.title || "");
  // const [content, setContent] = useState(activeNote?.content || "");

  const [error, setError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();

    // Fallback if 'required' is removed from the input fields
    if (!titleRef.current?.value || !contentRef.current?.value) {
      setError(true);
      return;
    }
    // if (!title || !content) {
    //   setError(true);
    //   return;
    // }

    setError(false);

    const data = {
      title: sanitiseInput(titleRef.current?.value || ""),
      content: sanitiseInput(contentRef.current?.value || ""),
    };

    // const data = {
    //   title: sanitiseInput(title),
    //   content: sanitiseInput(content),
    // };

    if (activeNote) {
      editNote(activeNote.id, data);
    } else {
      addNote(data);
    }

    onClose();
  };

  useEffect(() => {
    if (activeNote) {
      titleRef.current!.value = activeNote.title;
      contentRef.current!.value = activeNote.content;
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="add-note-form">
      <div className="add-note-form__input-container">
        <input
          required
          type="text"
          placeholder="Title..."
          className="add-note-form__input"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
        />
        <textarea
          required
          rows={4}
          placeholder="Note content..."
          className="add-note-form__text-area"
          // value={content}
          // onChange={(e) => setContent(e.target.value)}
          ref={contentRef}
        ></textarea>
      </div>
      {error && (
        <div className="add-note-form__error-container">
          <p className="add-note-form__error">Please fill in all fields</p>
        </div>
      )}
      <div className="add-note-form__button-container">
        <button
          type="button"
          onClick={onClose}
          className="add-note-form__button add-note-form__button--cancel"
        >
          Cancel
        </button>
        <button className="add-note-form__button" type="submit">
          {activeNote ? "Edit note" : "Add note"}
        </button>
      </div>
    </form>
  );
}

export default Form;
