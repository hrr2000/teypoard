'use client'
import { GRK } from "@/utils/functions";
import { useMemo, useState } from "react";
import Typer from "./home/Typer";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface IPlayer { 
  speed: string;
  accuracy: string;
  seconds: string;
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home() {
  const [numberOfWords, setNumberOfWords] = useState(10);
  const [players, setPlayers] = useState<IPlayer[]>([])
  const wordsOptions = [10, 25, 50];

  const options = useMemo(() => {
    return {numberOfWords}
  }, [numberOfWords])

  return (
    <div>
      <div className="flex gap-5">
        {wordsOptions.map((number) => {
          return (
            <button key={GRK('button')} onClick={() => {
              setNumberOfWords(number)
            }} className={`option-btn bg-secondary py-2 px-3 rounded-lg border-2 ${numberOfWords === number ? 'border-pink-600' : 'border-transparent'} hover:border-pink-600`}>
              {number}
            </button>
          )
        })}
      </div>

      <Typer 
        options={options} 
        onInit={async () => {
          if(!socket) {
            const initSocket = async () => {
              await fetch('/api/socket');
          
              socket = io();
          
              socket.on("players", (players) => {
                setPlayers(players)
              })
            }
            initSocket().catch(console.error);
          }
        }}
        onResultsChange={async (results) => {
          socket?.emit("progress", results);
        }}
        />

      <div className={`container relative overflow-auto`}>
        {players.sort((player1, player2) => parseInt(player2.speed) - parseInt(player1.speed)).map((player, idx) => {
          return (
            <div key={`player-${idx}`} className={`w-full flex flex-col gap-5 bg-secondary p-5 my-5 rounded-lg`}>
              <h2 className={`text-gray-300 border-b-4 h-6 w-fit border-pink-700`}>
                Guest player
              </h2>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xl text-hightlight">accuracy: {player.accuracy}</span>
                <span className="text-xl text-hightlight">speed: {player.speed}</span>
                <span className="text-xl text-hightlight">seconds: {player.seconds}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
