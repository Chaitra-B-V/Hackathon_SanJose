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
      twiml: `<Response>
                <Connect>
                  <Stream name="stream1" url="wss://${process.env.NGROK_BASE_URL}/audiostream" />
                </Connect>
              </Response>`,
      to: process.env.DIAL_TO_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.json({ message: "Call initiated", call: JSON.stringify(call) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/twiml-hook", (req: Request, res: Response) => {});

const server = http.createServer(app);
server.listen(1337, "127.0.0.1");

const wss = new websock.Server({ server });

// WebSocket connection for receiving audio stream
wss.on("connection", (ws: any) => {
  ws.on("message", (message: any) => {
    // Handle incoming audio stream data
    const data = JSON.parse(message);
    switch(data.event) {
      case 'connected':
        console.log('Connected to Twilio');
        break;
      case 'start':
        console.log('Media stream started');
        break;
      case 'media':
        console.log('Media stream chunk received');
        break;
      case 'stop':
        console.log('Media stream ended');
        break;
      case 'error':
        console.log('Error: ' + data.error);
        break;
      default:
        console.log('Unknown event: ' + data.event);
    }
  });
});

console.log("Server running at http://127.0.0.1:1337/");
