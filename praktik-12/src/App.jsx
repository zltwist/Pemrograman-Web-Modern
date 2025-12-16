import React from "react";
import Identity from "./components/Identity";
import Counter from "./components/Counter.jsx";
import "./App.css";

const App = () => {
  return (
    <>
      <Identity />
      <div className="portfolio-wrapper">
        <h2>Redux Toolkit Counter Example</h2>
        <Counter />
      </div>
    </>
  );
};

export default App;
