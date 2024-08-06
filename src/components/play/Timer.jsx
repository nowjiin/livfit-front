/* eslint-disable react/display-name */
import { memo, useEffect, useState } from "react";

const Timer = memo(({ start, paused, setTimeUp, duration }) => {
  const INTERVAL = 1000; // 1초

  const parseDuration = (duration) => {
    const [minutes, seconds] = duration.split(" ").map((part) => {
      const unit = part.slice(-1);
      const value = parseInt(part, 10);
      return unit === "분" ? value * 60 : value;
    });
    return (minutes || 0) * 1000 + (seconds || 0) * 1000;
  };

  const initialTime = parseDuration(duration);
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    let timer;

    if (start && !paused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - INTERVAL;
          return newTime >= 0 ? newTime : 0;
        });
      }, INTERVAL);
    }

    if (paused || !start) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [start, paused]);

  useEffect(() => {
    if (!start) {
      setTimeLeft(initialTime);
    }
  }, [start, paused, initialTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeUp(true);
    }
  }, [timeLeft, setTimeUp]);

  return (
    <div className="flex items-center justify-center mb-4 text-7xl font-GameNumber">
      {minutes} : {seconds}
    </div>
  );
});

export default Timer;
