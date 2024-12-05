import { FormEvent, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import "./modal.scss";

import { sanitiseInput } from "../../utils/sanitise";

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

    // Fallback if 'required' is removed from the input fields
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
                placeholder="Title..."
                className="modal__input"
                ref={titleRef}
              />
              <textarea
                required
                rows={4}
                placeholder="Note content..."
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
              <button
                onClick={onClose}
                className="modal__button modal__button--cancel"
              >
                Cancel
              </button>
              <button className="modal__button" type="submit">
                Add note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
