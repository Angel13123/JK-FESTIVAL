
"use client";

import { useState, useEffect } from 'react';

// This function is now outside the component.
const calculateTimeLeft = () => {
  const festivalDate = new Date('2026-02-07T00:00:00');
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

export function MobileCountdown() {
  // Initialize state to null to avoid hydration mismatch.
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    // Set the initial time on the client-side.
    setTimeLeft(calculateTimeLeft());

    // Then, set up the interval to update it.
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount.
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this runs only once on the client after mount.

  const timeUnits = [
    { label: 'Días', value: timeLeft?.days },
    { label: 'Horas', value: timeLeft?.hours },
    { label: 'Minutos', value: timeLeft?.minutes },
    { label: 'Segundos', value: timeLeft?.seconds },
  ];

  const formatValue = (value: number | undefined) => (value ?? 0).toString().padStart(2, '0');

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center text-center w-16 sm:w-20 p-2 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-yellow-400 tabular-nums">
            {timeLeft ? formatValue(unit.value) : '00'}
          </div>
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
