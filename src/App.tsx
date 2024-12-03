// import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <div className="header inner">
        <div className="header__title">
          <h1>Simple Notes</h1>
        </div>
        <div className="header__actions">
          <button className="header__button"></button>
        </div>
      </div>
      <div className="content">
        <div className="inner">
          <div className="note">
            <div className="note__header">
              <h2>My first note</h2>
            </div>
            <div className="node__content">
              <p>Here is the content of my first note.</p>
            </div>
          </div>
          <div className="note">
            <div className="note__header">
              <h2>My second note</h2>
            </div>
            <div className="node__content">
              <p>Here is the content of my second note.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
