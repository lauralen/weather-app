import React from "react";
import style from "./App.module.scss";

function App() {
  return (
    <>
      <header className={style.header}>
        <h1>Weather App</h1>

        <form>
          <input
            className={style.input}
            type="text"
            placeholder="Search"
          ></input>
        </form>
      </header>
    </>
  );
}

export default App;
