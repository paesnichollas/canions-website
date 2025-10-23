import { useEffect, useState } from "react";
import { EVENT_DATE } from "@shared/const";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(EVENT_DATE).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-8 py-8">
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-cta">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-white mt-2">Dias</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-cta">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-white mt-2">Horas</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-cta">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-white mt-2">Minutos</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-cta">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-white mt-2">Segundos</div>
      </div>
    </div>
  );
}

