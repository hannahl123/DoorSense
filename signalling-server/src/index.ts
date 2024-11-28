import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

class VideoStreamServer {
  app: express.Application;
  server: http.Server;
  io: SocketIOServer;
  port: number;

  constructor(port: number) {
    this.app = express();
    this.server = http.createServer(this.app);

    // initialize Socket.IO with CORS settings
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.port = port;
    this._setupSocketHandlers();
  }

  _setupSocketHandlers() {
    this.io.on("connection", (socket) => {
      console.log("New client connected with ID:", socket.id);

      // handle video stream from Raspberry Pi
      socket.on("incoming_video_stream", (data) => {
        console.log("incoming video stream!");
        this.io.emit("video_stream", data["frame"]);
      });

      // handle client disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected with ID:", socket.id);
      });
    });
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const streamServer = new VideoStreamServer(8080);
streamServer.start();
