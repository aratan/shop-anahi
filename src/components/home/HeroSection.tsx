import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 29, seconds: 46 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#9b87f5]/10 py-24 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-serif tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            PERFUMES ÁRABES
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Fragancias Orientales de Dubái, inspiradas en las mil y una noches. Vive la sensualidad y exotismo.
          </p>
          
          <div className="mt-8">
            <p className="text-lg font-semibold text-primary">Hurry up!</p>
            <p className="text-sm text-gray-500">Sale ends in:</p>
            <div className="flex justify-center gap-8 mt-2">
              <div className="text-center">
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm text-gray-500">Mins</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm text-gray-500">Secs</div>
              </div>
            </div>
          </div>

          <Button className="mt-8 text-lg px-8 py-3" size="lg">
            Shop now!
          </Button>
        </div>
      </div>
    </div>
  );
};