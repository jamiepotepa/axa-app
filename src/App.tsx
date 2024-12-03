// import { useState } from "react";
import "./App.css";
import { RxCross1 } from "react-icons/rx";

function App() {
  return (
    <div>
      <div className="header">
        <div className="header__inner inner">
          <div className="header__title">
            <h1>Simple Notes</h1>
          </div>
          <div className="header__actions">
            <button className="header__button button">
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
