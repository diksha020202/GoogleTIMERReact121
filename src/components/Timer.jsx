const { useState, useEffect } = require("react");

function Timer() {
  const [time, setTime] = useState(null);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [id, setID] = useState(null);
  // isTimerRunning?
  // regular interval we need to update it
  // we need to pause it
  // we need to stop it
  // reset

  useEffect(() => {
    if (time === 0) {
      clearInterval(id);
    }
  }, [time, id]);

  const handleUpdate = (time) => {
    setTime(time);
    setTimerRunning(true);
    handleStart();
  };

  const handleStart = () => {
    if (id !== null) return;
    if (time === 0) return;
    const _id = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    setID(_id);
    setTimerRunning(true);
    // we can do a better way, we will come back to it
  };

  const handleStop = () => {
    clearInterval(id);
    setTimerRunning(false);
    setID(null);
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  return (
    <div>
      {time === null ? (
        <TimerInput handleUpdate={handleUpdate} />
      ) : (
        <>
          <div style={{backgroundColor: "lightblue", fontSize:"100px"}}> Google Timer : {time} </div>
          {isTimerRunning ? (
            <button style={{backgroundColor:"red"}} onClick={handleStop}>PAUSE</button>
          ) : (
            <button style={{backgroundColor:"green"}} onClick={handleStart}>START</button>
          )}
          <button style={{backgroundColor:"yellow"}} onClick={handleReset}>RESET</button>
        </>
      )}
    </div>
  );
}
/**
 *
 * TimerInput you can define the time for runnig
 */
const TimerInput = ({ handleUpdate }) => {
  const [time, setTime] = useState(0);

  const handleTimeUpdate = (value) => {
    console.log(`oops`, value);
    if (Number.isNaN(value)) {
      alert("please input number");
      return;
    }
    setTime(Number(value));
  };
  console.log(time);
  return (
    <div>
      <input value={time} onChange={(e) => handleTimeUpdate(e.target.value)} />
      <button style={{backgroundColor:"lightblue", fontSize:"50px"}} onClick={() => handleUpdate(time)}>START TIMER </button>
    </div>
  );
};

export default Timer;
