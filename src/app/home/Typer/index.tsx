'use client'
import { DifficultyLevel } from "@/app/page";
import React from "react";
import { useEffect } from "react";
import useTyper, { TypingResults } from "./hooks/useTyper";
import Word from "./Word";

export interface ITyper {
  options: {
    numberOfWords: number;
    difficulty: DifficultyLevel
  }
  onInit?: () => void;
  onResultsChange?: (results: TypingResults) => void
}


function Typer({options, onInit, onResultsChange}: ITyper) {
  const {
    isActive,
    activeWordIndex,
    buffer,
    bufferHistory,
    caretPosition,
    displayCaret,
    statement,
    testsCount,
    results,
    handleLetterCaretChange,
    focusAction,
    setTestsCount
  } = useTyper({options, onInit, onResultsChange});


  useEffect(() => {
    void onInit?.();
  }, [])

  useEffect(() => {
    void onResultsChange?.(results);
  }, [results])

  return testsCount > -1 ? (
    <div id="typer" className="w-full flex flex-wrap overflow-hidden text-3xl relative my-10" onClick={focusAction(true)}>
      {displayCaret && isActive && (
        <span id="typer-caret"
          className={`w-[3px] h-8 rounded-lg duration-100 bg-pink-500 block absolute`} style={{
            top: caretPosition.top,
            left: caretPosition.left
          }}></span>
      )}
      <div className="flex flex-col gap-1 w-full py-2">
        <span className="text-xl text-hightlight">accuracy: {results.accuracy}</span>
        <span className="text-xl text-hightlight">speed: {results.speed}</span>
        <span className="text-xl text-hightlight">seconds: {results.seconds}</span>
      </div>
      {statement.map((word, idx) => {
        if (activeWordIndex > idx) {
          return <Word
            setCaretPosition={handleLetterCaretChange}
            key={'word' + word + idx}
            isActive={false}
            isPassed={true}
            word={word}
            buffer={bufferHistory?.[idx]} />
        }
        return (<Word
          setCaretPosition={handleLetterCaretChange}
          key={'word' + word + idx}
          isActive={idx === activeWordIndex}
          isPassed={activeWordIndex > idx}
          word={word}
          buffer={activeWordIndex === idx ? buffer : ''} />)
      })}
      <div className="w-full text-center my-14">
        <input type="text"
          id="hdn-in"
          className="w-0 p-0 outline-0 focus:outline-0 border-none outline-transparent"
          style={{
            boxShadow: 'none !important',
            border: 'none !important'
          }} />
        <button
          onClick={(e) => setTestsCount(cnt => cnt + 1)}
          className="px-5 py-2 bg-secondary rounded-lg duration-200 hover:bg-gray-300 focus:bg-gray-300 outline-0 m-auto">Next
        </button>
      </div>
    </div>
  ) : <></>
}

export default React.memo(Typer);