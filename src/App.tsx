// import { useState } from "react";
// import "./App.css";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

function App() {
  const [showModal, setShowModal] = useState(false);

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
        <div className="notes-container">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;

function Note() {
  return (
    <div className="note">
      <div className="note__header">
        <h2>My first note</h2>
      </div>
      <div className="node__content">
        <p>Here is the content of my first note.</p>
      </div>
      <div className="note__actions">
        <button className="note__button note__button--edit">Edit</button>
        <button className="note__button note__button--delete">Delete</button>
      </div>
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  // onSave: () => void;
};

function Modal({ onClose }: ModalProps) {
  // // ! DO I NEED THIS OR CAN I JUST INLINE IT?
  // const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  // };

  const handleSave = () => {
    console.log("saved");
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
          <form>
            <input
              type="text"
              placeholder="Title ..."
              className="modal__input"
            />
            <textarea
              placeholder="Note content ..."
              className="modal__text-area"
            ></textarea>
          </form>
        </div>
        <div className="modal__footer">
          {/* <button className="modal__button modal__button--cancel">
            Cancel
          </button> */}
          <button className="modal__button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
