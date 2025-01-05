import { useState } from "react";
import "./Form.css";

const Form = ({
  processes,
  setProcesses,
  result,
  setResult,
  setLoading,
  setError,
}) => {
  const [priority, setPriority] = useState();
  const [duration, setDuration] = useState();
  const [time, setTime] = useState();
  const [invalid, setInvalid] = useState([false, false, false]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e, i) => {
    const { value, validity } = e.target;

    switch (i) {
      case 0:
        setPriority(value);
        setInvalid([!validity.valid, invalid[1], invalid[2]]);
        break;
      case 1:
        setDuration(value);
        setInvalid([invalid[0], !validity.valid, invalid[2]]);
        break;
      case 2:
        setTime(value);
        setErrorMsg("");
        setInvalid([invalid[0], invalid[1], !validity.valid]);
        break;
    }
  };
  const addProcess = () => {
    if (
      processes &&
      processes.length > 0 &&
      parseFloat(processes[processes.length - 1].time) > parseFloat(time)
    ) {
      setTime("");
      setErrorMsg(
        "The value of the arrival time must be greater than or equal to the arrival time of the process's prior."
      );
      return;
    }
    const newProcess = {
      pid: processes.length + 1,
      priority: priority,
      duration: duration,
      time: time,
    };
    setProcesses([...processes, newProcess]);
    setPriority("");
    setDuration("");
    setTime("");
  };
  const fetchResult = async () => {
    setError()
    setLoading(true);
    let url = "http://127.0.0.1:5000/api?";
    for (let i = 0; i < processes.length; i++) {
      if (i != 0) url += "&";
      url += "Plist=" + processes[i].priority;
      url += "&Dlist=" + processes[i].duration;
      url += "&Alist=" + processes[i].time;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const res = await response.json();
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="top-div">
      <div className="form">
        <div className="flex-div">
          <input
            type="text"
            name="PInput"
            className="input"
            pattern="^(?:\d{1,3}|1000)$"
            placeholder="Priority"
            autoComplete="off"
            value={priority}
            onChange={(e) => handleChange(e, 0)}
            title="Please enter an integer greater than or equal to 0 "
          />
          <input
            type="text"
            name="DInput"
            className="input"
            pattern="^(?:\d{1,3}(?:\.\d+)?|1000(?:\.0+)?)$"
            placeholder="Estimated Duration"
            autoComplete="off"
            value={duration}
            onChange={(e) => handleChange(e, 1)}
            title="Please enter a number greater than or equal to 0 "
          />
          <input
            type="text"
            name="AInput"
            className="input"
            pattern="^(?:\d{1,3}(?:\.\d+)?|1000(?:\.0+)?)$"
            placeholder="Arrival Time"
            autoComplete="off"
            value={time}
            onChange={(e) => handleChange(e, 2)}
            title="Please enter a number greater than or equal to 0 and greater than the arrival time of the process's prior"
          />
        </div>
        {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
        <div className="flex-div">
          <button
            className="Button"
            disabled={
              !(priority && duration && time) ||
              invalid[0] ||
              invalid[1] ||
              invalid[2] ||
              result
            }
            onClick={addProcess}
          >
            Add Process
            <div className="iconButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            </div>
          </button>
          <button
            className="Button"
            disabled={processes.length < 2 || result}
            onClick={fetchResult}
          >
            Minimize the waiting time
            <div className="iconButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24"
                height="24"
                x="0"
                y="0"
                viewBox="0 0 39.003 39.003"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M19.496 5.997a14.917 14.917 0 0 1 1.415.074c.441.047.879.114 1.305.203a15.82 15.82 0 0 1 .742.172c.508.137 1.004.297 1.488.489.059.023.118.05.18.074.242.101.484.207.723.32.098.051.195.098.293.149.16.082.316.168.473.253.066.04.137.079.207.122.301.175.594.363.879.562.039.027.074.051.109.078h.005c.175.125.347.254.515.391h.004a13.708 13.708 0 0 1 3.039 3.344 13.314 13.314 0 0 1 1.308 2.636c.113.309.219.625.309.946.035.129.07.257.102.386.051.196.094.391.137.586.023.11.043.223.063.332.043.223.074.446.105.672a14.269 14.269 0 0 1-.002 3.434c-.031.227-.063.449-.105.672-.02.109-.039.219-.063.328-.047.223-.098.438-.152.652-.109.434-.242.855-.395 1.27-.074.207-.156.41-.241.609-.044.102-.087.203-.134.305a13.472 13.472 0 0 1-1.296 2.259 13.905 13.905 0 0 1-1.934 2.179c-.16.145-.324.285-.492.422a13.568 13.568 0 0 1-3.637 2.149c-.41.159-.828.3-1.254.421a13.197 13.197 0 0 1-3.344.507c-.118.004-.235.008-.352.008s-.23-.004-.348-.008c-.113 0-.23-.004-.343-.012a5.465 5.465 0 0 1-.344-.023 11.371 11.371 0 0 1-.648-.063c-.012 0-.02-.004-.032-.004h-.004l-.336-.047c-.109-.02-.222-.035-.332-.055-.109-.023-.218-.043-.328-.066h-.004c-.109-.02-.218-.047-.324-.07a11.839 11.839 0 0 1-.648-.168c-.028-.004-.047-.016-.071-.02a14.13 14.13 0 0 1-1.097-.371l-.086-.035s0 .005 0 0a12.827 12.827 0 0 1-.305-.12c-.101-.044-.199-.091-.301-.134-.097-.047-.199-.09-.297-.137-.097-.051-.195-.098-.293-.148-.097-.051-.191-.102-.289-.152a11.876 11.876 0 0 1-.285-.16l-.281-.164c-.09-.059-.184-.113-.273-.172a12.071 12.071 0 0 1-.539-.363c-.09-.063-.176-.129-.262-.194 0 0 0 .003 0 0-.086-.063-.172-.13-.258-.196s-.168-.138-.254-.204c-.164-.141-.328-.277-.488-.426a12.737 12.737 0 0 1-.696-.68 18.317 18.317 0 0 1-.437-.477 15.98 15.98 0 0 1-.41-.5v-.004a12.598 12.598 0 0 1-.926-1.332 13.677 13.677 0 0 1-.48-.852v-.004a13.364 13.364 0 0 1-.282-.59 13.18 13.18 0 0 1-.683-1.855v-.004c-.09-.32-.172-.645-.239-.973a14.272 14.272 0 0 1-.164-1c-.043-.34-.074-.68-.089-1.024-.008-.117-.012-.23-.016-.347C6 19.731 6 19.618 6 19.501c0-.348.012-.695.039-1.035v-.004c.008-.113.02-.227.031-.34.067-.68.188-1.344.352-1.992.223-.863.527-1.691.906-2.477.004 0 .004 0 .004-.004a13.49 13.49 0 0 1 2.395-3.46c.074-.079.152-.157.226-.231.156-.152.313-.301.469-.449.242-.215.488-.426.742-.629.172-.133.344-.262.524-.387a11.75 11.75 0 0 1 1.093-.703c.188-.109.379-.215.571-.312h.003c.192-.102.391-.196.59-.286.098-.043.2-.089.301-.132a13.84 13.84 0 0 1 1.879-.637 14.198 14.198 0 0 1 1.992-.356c.113-.011.227-.023.34-.031.344-.023.688-.039 1.039-.039zm0-5.996c-1.004.004-2 .086-2.992.246v2.418a.749.749 0 0 1-.59.731 16.554 16.554 0 0 0-5.258 2.187.749.749 0 0 1-.929-.098L7.996 3.759a19.447 19.447 0 0 0-4.238 4.238L5.48 9.724c.25.25.293.64.106.937a16.487 16.487 0 0 0-2.188 5.254.747.747 0 0 1-.73.586H.246C.086 17.493 0 18.489 0 19.497s.086 2.012.246 3.004h2.422a.75.75 0 0 1 .73.582 16.539 16.539 0 0 0 2.188 5.262.752.752 0 0 1-.106.934l-1.707 1.722a19.455 19.455 0 0 0 4.223 4.25l1.731-1.73a.749.749 0 0 1 .929-.105 16.556 16.556 0 0 0 5.258 2.188c.344.078.59.379.59.73v2.414c.992.156 1.992.25 3 .254a19.277 19.277 0 0 0 2.996-.242v-2.426c0-.352.242-.652.586-.73a16.486 16.486 0 0 0 5.258-2.188.75.75 0 0 1 .93.105L31 35.251a19.432 19.432 0 0 0 4.242-4.25l-1.727-1.723a.746.746 0 0 1-.098-.934 16.52 16.52 0 0 0 2.184-5.262.756.756 0 0 1 .734-.582h2.414c.16-.992.25-1.996.254-3.004 0-1.008-.086-2.004-.238-2.996h-2.43a.751.751 0 0 1-.734-.586 16.407 16.407 0 0 0-2.18-5.266.75.75 0 0 1 .105-.933l1.715-1.719a19.469 19.469 0 0 0-4.238-4.238l-1.719 1.715a.75.75 0 0 1-.934.105 16.568 16.568 0 0 0-5.266-2.183.744.744 0 0 1-.584-.73V.224a20.155 20.155 0 0 0-2.996-.223z"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M19.496 18.751c.426 0 .754.328.754.75 0 .426-.328.75-.754.75a.734.734 0 0 1-.746-.75c0-.422.324-.75.746-.75z"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M19.496 10.501c-4.961 0-8.996 4.039-8.996 9 0 1.242.254 2.43.711 3.504a9.052 9.052 0 0 0 1.926 2.859.751.751 0 0 0 1.062 0 .755.755 0 0 0 0-1.059 7.511 7.511 0 0 1-1.609-2.387 7.45 7.45 0 0 1-.59-2.917 7.49 7.49 0 0 1 7.496-7.5c1.809 0 3.461.633 4.754 1.691l-3.777 3.778v.004a2.3 2.3 0 0 1 1.054 1.058h.004l3.777-3.781A7.464 7.464 0 0 1 27 19.501a7.456 7.456 0 0 1-.586 2.918 7.534 7.534 0 0 1-1.613 2.387.755.755 0 0 0 0 1.059.753.753 0 0 0 1.063 0 9.013 9.013 0 0 0 1.93-2.859 9.038 9.038 0 0 0 .706-3.505 8.973 8.973 0 0 0-2.133-5.809l.41-.414a.742.742 0 0 0 0-1.054.74.74 0 0 0-1.054 0l-.414.41a8.954 8.954 0 0 0-5.813-2.133z"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
