import Identity from "./components/Identity.jsx";
import Counter from "./components/Counter.jsx";
import "./App.css";

const App = () => {
  return (
    <>
      <Identity />
      <div className="app-shell">
        <h2>Redux Toolkit Counter</h2>
        <div className="counter-panel">
          <Counter />
        </div>
      </div>
    </>
  );
};

export default App;
