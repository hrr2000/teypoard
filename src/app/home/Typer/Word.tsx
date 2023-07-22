import { GRK } from "@/utils/functions";
import { memo, useState } from "react";
import useWord from "./hooks/useWord";
import Letter from "./Letter";
import { letterStates } from "./utils/constants";
import { arabicTranslation } from "./data/arabicTranslation";

type ArabicTranslationKeyType = keyof typeof arabicTranslation

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
    <span 
    className={`mr-4 mb-2 hover:text-orange-400 group cursor-pointer relative inline-block duration-200 ${isPassed && word != buffer ? 'border-b-2 border-pink-500' : ''}`}>
      <span className={`absolute text-black font-bold block w-max font-tajawal top-0 group-hover:top-[-150%] text-[20px] bg-white px-3 py-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-90`}>
        {arabicTranslation?.[word as ArabicTranslationKeyType] || 'لا توجد ترجمة'}
        <span className={`absolute block h-2 w-2 bg-white opacity-90 rotate-45 -bottom-1 left-1/2 -translate-x-1/2`}></span>
      </span>
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