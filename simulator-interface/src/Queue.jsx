import "./Queue.css";

const Queue = ({ processes, loading, result }) => {
  
  return (
    <>
      <div className="queue" style={loading ? { filter: "blur(20px)" } : {}}>
        {processes.length > 0 &&
          processes.map((p) => (
            <div
              className={!result ? "PBC" : "out"}
              key={p.pid}
            >
              <div className="flip-card">
                <div className="front">P{p.pid}</div>
                <div className="back">
                  <span>
                    <b>Priority : </b>
                    {p.priority}
                  </span>
                  <hr />
                  <span>
                    <b>E. Duration : </b>
                    {p.duration}s
                  </span>
                  <hr />
                  <span>
                    <b>A. Time : </b>
                    {p.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        {result &&
          processes
            .sort((a, b) => result["TD" + a.pid] - result["TD" + b.pid])
            .map((p) => (
              <div className={"new-PBC"} key={p.pid}>
                <div className="flip-card">
                  <div className="front">P{p.pid}</div>
                  <div className="back">
                    <hr />
                    <span>
                      <b>Waiting time : </b>
                      {(result["TF" + p.pid] - p.time - p.duration).toFixed(2)}s
                    </span>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div
        style={
          loading
            ? {
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: "32%",
                left: "43%",
              }
            : {
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: "36%",
                left: "46%",
              }
        }
      >
        {loading && (
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
          {loading ? "Optimizing" : processes.length === 0 && "Empty Queue"}
        </span>
      </div>
    </>
  );
};

export default Queue;
