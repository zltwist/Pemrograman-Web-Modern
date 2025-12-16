import Counter from "./components/Counter.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app-shell">
      <h2>Redux Toolkit Counter Example</h2>
      <div className="counter-card">
        <Counter />
      </div>
    </div>
  );
};

export default App;
