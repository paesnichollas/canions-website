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

  const units = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-5 py-8">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="nl-card flex min-w-[64px] items-center justify-center px-3 py-3 md:min-w-[92px] md:px-6 md:py-4">
            <span className="text-4xl md:text-5xl font-bold text-cta tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-[var(--text-sec)]">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

