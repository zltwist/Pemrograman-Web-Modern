import Identity from './components/Identity';
import React from "react";
import "./App.css";
import EventDemo from "./components/EventDemo";
import FormDemo from "./components/FormDemo";

function App() {
  return (
    <>
<Identity />
<div className="rangga-wrapper">
<div className="App">
      <h1>React Event Handling dan Form Demo</h1>
      <EventDemo />
      <FormDemo />
    </div>
  
</div>
</>);
}

export default App;
      

