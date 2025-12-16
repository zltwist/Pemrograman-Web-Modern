import React from "react";
import Counter from "./components/Counter.jsx";
import Identity from "./components/Identity";

const App = () => {
  return (
    <>
      <Identity />
      <div style={{ padding: 20 }}>
        <h2>Redux Toolkit Counter Example</h2>
        <Counter />
      </div>
    </>
  );
};

export default App;
