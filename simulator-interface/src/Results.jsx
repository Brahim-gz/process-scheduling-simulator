import ApexChart from "./ApexChart";
import "./Results.css";

const Results = ({
  error,
  result,
  processes,
  setProcesses,
  setResult,
  setError,
}) => {
  const reset = () => {
    setError();
    setProcesses([]);
    setResult();
  };

  return (
    <div className="bottom-div">
      {(result || error) && (
        <div className="flex-bloc">
          {result && <ApexChart result={result} processes={processes} />}
          <div
            className="wrapper"
            style={result ? { height: "12em" } : { height: "20em" }}
          >
            {error && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <g data-name="Layer 2">
                    <g data-name="Layer 1">
                      <path
                        fill="#cf1f25"
                        d="M23.62 19.05 14.29 2.61a2.56 2.56 0 0 0-4.45 0L.5 19.05a2.56 2.56 0 0 0 2.23 3.82h18.66a2.56 2.56 0 0 0 2.23-3.82z"
                        opacity="1"
                        data-original="#cf1f25"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="M13.22 19.16a1.45 1.45 0 0 1-1 .38 1.49 1.49 0 0 1-1-.37 1.33 1.33 0 0 1-.44-1.05 1.41 1.41 0 0 1 1.43-1.42 1.41 1.41 0 0 1 1 .41 1.36 1.36 0 0 1 .42 1 1.34 1.34 0 0 1-.41 1.05zM13.6 9.64l-.37 4.19A3.37 3.37 0 0 1 13 15a.82.82 0 0 1-.78.48.8.8 0 0 1-.77-.47 4 4 0 0 1-.27-1.23l-.27-4.08c-.05-.81-.08-1.37-.08-1.72a1.7 1.7 0 0 1 .41-1.2 1.42 1.42 0 0 1 1.08-.44A1.12 1.12 0 0 1 13.4 7a3.53 3.53 0 0 1 .26 1.52 11.3 11.3 0 0 1-.06 1.12z"
                        opacity="1"
                        data-original="#ffffff"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            )}
            {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "x-large",
                  fontWeight: "bolder",
                }}
              >
                {error}
              </p>
            )}
            {result && (
              <div className="optimum">
                the minimal average waiting time is{" "}
                {result["OPT"] > 0 ? result["OPT"].toFixed(2) : 0}s
              </div>
            )}
            <button
              className="Button"
              id={error ? "ButtonError" : ""}
              onClick={reset}
            >
              Reset Queue
              <div className="iconButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      fill="#ffffff"
                      d="M16.379 6.207C15.189 5.255 13.743 4.5 12 4.5a7.5 7.5 0 1 0 7.065 10.026c.185-.52.71-.87 1.25-.755l.978.208c.54.114.89.647.725 1.174C20.678 19.411 16.702 22.5 12 22.5 6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5c2.783 0 4.952 1.268 6.511 2.575l1.782-1.782A1 1 0 0 1 22 3v5.5a1 1 0 0 1-1 1h-5.5a1 1 0 0 1-.707-1.707z"
                      opacity="1"
                      data-original="#1e1e1e"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Results;
