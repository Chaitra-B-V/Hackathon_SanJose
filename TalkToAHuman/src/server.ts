const http = require("http");
import express, { Request, Response } from "express";
const websock = require("ws");
const twilio = require("twilio");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.get("/make-call", async (req: Request, res: Response) => {
  try {
    const call = await twilioClient.calls.create({
      twiml:
        '<Response><Say>Hello! Start talking and the live audio will be streamed to your app</Say><Start><Stream name="stream1" url="wss://d236-208-95-232-29.ngrok-free.app/audiostream" /></Start><Pause length="30" /></Response>',
      to: process.env.DIAL_TO_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.json({ message: "Call initiated", call: JSON.stringify(call) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/audio-stream", (req: Request, res: Response) => {});

const server = http.createServer(app);
server.listen(1337, "127.0.0.1");

const wss = new websock.Server({ server });

// WebSocket connection for receiving audio stream
wss.on("connection", (ws: any) => {
  ws.on("message", (message: any) => {
    // Handle incoming audio stream data
    console.log("Received audio data:", message);
  });

  ws.on("audiostream", (message: any) => {
    // Handle incoming audio stream data
    console.log("Received audio data:", message);
  });
});

console.log("Server running at http://127.0.0.1:1337/");