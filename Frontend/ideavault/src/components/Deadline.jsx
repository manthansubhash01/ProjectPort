import React from "react";
import { useState, useEffect } from "react";

const Deadline = (props) => {
  const calculateTimeLeft = () => {
    const difference = new Date(props.deadline) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [props.deadline]);

  const isTimeUp = Object.keys(timeLeft).length === 0;

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#fa8029] to-[#ff9040] text-white rounded-xl p-5 shadow-md">
      <div className="flex items-center gap-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold">{props.label}</h3>
      </div>
      {isTimeUp ? (
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-sm">Deadline Passed</p>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-xs opacity-90">Days</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs opacity-90">Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs opacity-90">Mins</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs opacity-90">Secs</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deadline;
