
"use client";

import { useState, useEffect } from 'react';

export function Countdown() {
  const festivalDate = new Date('2026-02-07T00:00:00');
  
  const calculateTimeLeft = () => {
    const difference = +festivalDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial value on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  const formatValue = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="flex justify-center gap-2 md:gap-8">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center text-center w-20 md:w-24 p-2 md:p-3 bg-black rounded-xl border-[3px] border-black hard-shadow">
          <div className="text-4xl md:text-6xl font-bold font-mono text-[#FAFF00] tabular-nums">
            {formatValue(unit.value)}
          </div>
          <div className="text-xs md:text-md font-bold uppercase tracking-wider text-[#FAFF00]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
