import React from "react";
import Identity from "./components/Identity";
import EnrollmentForm from "./components/EnrollmentForm.jsx";

const App = () => {
  return (
    <>
      <Identity />
      <div className="rangga-wrapper">
        <EnrollmentForm />
      </div>
    </>
  );
};

export default App;
