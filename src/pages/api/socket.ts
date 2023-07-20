import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

const players = new Map();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  
  const io = new IOServer(res.socket.server);
  io.setMaxListeners(50)
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.setMaxListeners(50)
    socket.on("progress", (data) => {
      players.set(socket.id, data);
      console.log(players)
      console.log(io.engine.clientsCount)
      io.emit("players", Array.from(players.values()))
    })

    socket.on("disconnect", () => {
      console.log("disconnect")
      players.delete(socket.id)
    })
  })

  res.end()
}