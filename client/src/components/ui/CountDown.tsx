import React, { useEffect, useState } from "react";

// Define the type for the time left object
type TimeLeft =
  | {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | undefined;

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const registrationEndDate = new Date("2024-11-03T23:59:59"); // Set your end date and time here
    const now = new Date();
    const difference = registrationEndDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return undefined;
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center  text-white p-6 rounded-lg md:absolute m-3 top-0 right-10">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase">
        The portal will close in:
      </h1>
      {timeLeft ? (
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold">Registration has ended</div>
      )}
    </div>
  );
};

export default CountdownTimer;
