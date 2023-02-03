import { useMemo, useState } from "react"

export default function useCalculator({ totalLettersCount }: { totalLettersCount: number }) {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [correctLettersCount, setCorrectLettersCount] = useState(0);

  const parseSpeed = (speed: number) => {
    return speed + 'wpm';
  }

  const parseAccuracy = (accuracy: number) => {
    return accuracy.toFixed(2) + '%'
  }

  const startTimer = (timerLimit: number) => {
    const timer = setInterval(() => {
      setSecondsPassed((seconds) => seconds + 1);
      if (secondsPassed === timerLimit || !isRunning) clearInterval(timer);
    }, 1000);
    return timer;
  }

  const calculateSpeed = () => {
    return correctLettersCount / (5 * secondsPassed);
  }

  const calculateAccuracy = () => {
    return correctLettersCount / totalLettersCount * 100;
  }


  const wpmCalculator = useMemo(() => ({
    start: (timerLimit: number = 30) => {
      setIsRunning(true);
      startTimer(timerLimit);
    },
    stop: () => {
      setIsRunning(false);
    },
    refresh: () => {
      setIsRunning(false);
      setSecondsPassed(0);
      setCorrectLettersCount(0);
    },
    status: () => {
      return isRunning;
    },
    result: () => {
      return {
        speed: parseSpeed(calculateSpeed()),
        accuracy: parseAccuracy(calculateAccuracy())
      }
    }
  }), [])

  return {
    wpmCalculator
  }
}
