import Form from "./Form";
import Results from "./Results";
import Queue from "./Queue";
import { useState } from "react";

function App() {
  const [processes, setProcesses] = useState([]);

  return (
    <>
      <Form processes={processes} setProcesses={setProcesses} />
      <Queue />
      <Results />
    </>
  );
}

export default App;
