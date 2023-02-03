import { getStateValueFromSetter, GRK } from "@/utils/functions";
import { useEffect, useMemo, useRef, useState } from "react"

export default function useCalculator({ statement, bufferHistory, buffer }: { statement: string[]; bufferHistory: string[]; buffer: string}) {
  const [isStopped, setIsStopped] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [correctLettersCount, setCorrectLettersCount] = useState(0);
  const [totalLettersCount, setTotalLettersCount] = useState(0);
  const [timerReference, setTimerReference] = useState<any>();

  const stateRef = useRef({
    isStopped,
    isRunning,
    secondsPassed,
    correctLettersCount,
    timerReference,
    totalLettersCount
  });

  stateRef.current = {
    isStopped,
    isRunning,
    secondsPassed,
    correctLettersCount,
    timerReference,
    totalLettersCount
  }

  
  useEffect(() => {
    const tmpBufferHistory = bufferHistory.map((item) => item);
    tmpBufferHistory.push(buffer);
    // console.log(tmpBufferHistory, statement)
    let correctLetters = 0, totalLetters = 0;
    statement.forEach((word: string, idxWord) => {
      if(tmpBufferHistory.length > idxWord) {
        tmpBufferHistory[idxWord]?.split('').forEach((letter, idxLetter) => {
          totalLetters ++;
          if(word[idxLetter] === tmpBufferHistory[idxWord]?.[idxLetter]) correctLetters ++;
        })
      }
    })
    setCorrectLettersCount(correctLetters);
    setTotalLettersCount(totalLetters);
  }, [buffer])

  const parseSpeed = (speed: number) => {
    return speed.toFixed(0) + 'wpm';
  }

  const parseAccuracy = (accuracy: number) => {
    return accuracy.toFixed(2) + '%'
  }

  const startTimer = async () => {
    const timer = setInterval(async () => {
      await setSecondsPassed((seconds) => seconds + 1);
    }, 1000);
    setTimerReference(timer);
    return timer;
  }

  const calculateSpeed = () => {
    const {correctLettersCount, secondsPassed} = stateRef.current;
    return ((correctLettersCount || 0) / (5 * (secondsPassed || 1))) * 60;
  }

  const calculateAccuracy = () => {
    const {correctLettersCount, totalLettersCount} = stateRef.current;
    return (correctLettersCount || 0) / (totalLettersCount || 1) * 100;
  }

  useEffect(() => {
    if(isStopped) {
      clearInterval(timerReference);
    }
  }, [timerReference, isStopped]);

  const wpmCalculator = () => ({
    start: async (timerLimit: number = 30) => {
      await setIsRunning(true);
      await startTimer();
      console.log('round started');
    },
    stop: async () => {
      await setIsRunning(false);
      await setIsStopped(true);
      console.log('round stopped');
    },
    refresh: async () => {
      setIsRunning(false);
      setSecondsPassed(0);
      setCorrectLettersCount(0);
      await setIsStopped(true);
      setIsStopped(false);
      setTimerReference(null);
    },
    status: async () => {
      return getStateValueFromSetter(setIsRunning);
    },
    isStopped: async () => {
      return getStateValueFromSetter(setIsStopped);
    },
    result: () => {
      return {
        speed: parseSpeed(calculateSpeed()),
        accuracy: parseAccuracy(calculateAccuracy())
      }
    }
  })

  return {
    wpmCalculator: wpmCalculator()
  }
}
