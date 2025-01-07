import Form from "./Form";
import Results from "./Results";
import Queue from "./Queue";
import { useState } from "react";

function App() {
  const [processes, setProcesses] = useState([]);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  return (
    <>
      <Form
        processes={processes}
        setProcesses={setProcesses}
        result={result}
        setResult={setResult}
        setLoading={setLoading}
        setError={setError}
      />
      <Queue processes={processes} loading={loading} result={result} />
      <Results
        error={error}
        result={result}
        processes={processes}
        setProcesses={setProcesses}
        setResult={setResult}
        setError={setError}
      />
    </>
  );
}

export default App;
