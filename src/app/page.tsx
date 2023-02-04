'use client'
import { GRK } from "@/utils/functions";
import { useState } from "react";
import Typer from "./home/Typer";

export default function Home() {
  const [numberOfWords, setNumberOfWords] = useState(10);
  const wordsOptions = [10, 25, 50, 75];

  return (
    <div>
      <div className="flex gap-5">
        {wordsOptions.map((number) => {
          return (
            <button key={GRK('button')} onClick={() => {
              setNumberOfWords(number)
            }} className={`bg-secondary py-2 px-3 rounded-lg border-2 ${numberOfWords === number ? 'border-pink-600' : 'border-transparent'} hover:border-pink-600`}>
              {number}
            </button>
          )
        })}
      </div>
      <Typer options={{
        numberOfWords 
      }} />
    </div>
  )
}
