import { GRK } from "@/utils/functions";
import { memo } from "react";
import useWord from "./hooks/useWord";
import Letter from "./Letter";
import { letterStates } from "./utils/constants";

function Word({ word,
  isActive,
  buffer,
  isPassed,
  setCaretPosition,
}: {
  word: string;
  isActive: boolean;
  buffer: string;
  isPassed: boolean;
  setCaretPosition: Function,
}) {
  const { content, compareLetters } = useWord({ word, isActive, buffer, isPassed });

  return (
    <span className={`mr-4 inline-block duration-200 ${isPassed && word != buffer ? 'border-b-2 border-pink-500' : ''}`}>
      {content.split('').map((letter, idx) => {
        if (word.length <= idx) {
          // extra letter
          return <Letter
            id={GRK('letter')}
            isActive={false}
            setCaretPosition={setCaretPosition}
            key={GRK('letter')}
            value={letter}
            state={letterStates.EXTRA} />
        }
        return <Letter
          id={GRK('letter')}
          isActive={isActive && idx === buffer.length}
          key={GRK('letter')}
          setCaretPosition={setCaretPosition}
          value={word[idx]}
          state={(isActive || isPassed) ? compareLetters(idx) : ''} />
      })}
      {(isActive && word.length <= buffer.length) && (
        <Letter
          id={GRK('letter')}
          isActive={true}
          setCaretPosition={setCaretPosition}
          key={GRK('letter')}
          value={''}
          state={letterStates.EXTRA} />
      )}
    </span>
  )
}

export default memo(Word);