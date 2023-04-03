import { useState, useRef, useEffect } from "react";

const Timer = ({ timeLimit, interval = 1000, onTimeUp }) => {
  const [internalTime, setInternalTime] = useState(timeLimit);
  const timerRef = useRef(timeLimit);
  const timeRef = useRef(timeLimit);

  useEffect(() => {
    if (internalTime === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [internalTime, onTimeUp]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime((timeRef.current -= interval)),
      interval
    );
    return () => clearTimeout(timerRef.current);
  }, [interval]);

  return (
    <span className="timer">{`Time: ${internalTime / 1000} seconds`}</span>
  );
};

export default Timer;
