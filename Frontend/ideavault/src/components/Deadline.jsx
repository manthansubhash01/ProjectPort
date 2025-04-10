import React from 'react'
import { useState,useEffect } from 'react';

const Deadline = (props) => {

  const calculateTimeLeft = () => {
    const difference  = new Date(props.deadline) - new Date();
    let timeLeft = {}

    if (difference > 0){
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft
  }
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [props.deadline]);

  const isTimeUp = Object.keys(timeLeft).length === 0;

  return (
    <div className="p-4 w-125 ml-49 mb-5 text-amber-50 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold inline-block mr-7">{props.label} :</h3>
      {isTimeUp ? (
        <p className="text-red-500 font-bold mt-2 inline-block">
          ⏰ Deadline Passed
        </p>
      ) : (
        <p className="text-xl font-mono mt-2 inline-block">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
      )}
    </div>
  );
}

export default Deadline;