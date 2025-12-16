import Identity from './components/Identity';
import React  from "react";
import LifecycleDemo from "./components/LifecycleDemo.jsx";
import EffectDependenciesDemo from "./components/EffectDependenciesDemo.jsx";
import DataFetchingDemo from "./components/DataFetchingDemo.jsx";
import "./Styles.css";

function App() {
  return (
    <>
<Identity />
<div className="rangga-wrapper">
<div className="App">
      <h1>React useEffect Demonstration</h1>
      <LifecycleDemo />
      <EffectDependenciesDemo />
      <DataFetchingDemo />
    </div>
  
</div>
</>);
}

export default App;

