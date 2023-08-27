
# Installation

1. Create a Twilio Account 
1. Create a Twilio Phone Number
1. Copy .env.sample to .env
1. Update the .env file with your Twilio Auth Token, Account SID and Twilio Phone Number
1. Update DIAL_TO_NUMBER with your own phone number. Twilio will call this number.
1. Create an account on ngrok.com
1. Download and install ngrok on your computer
1. Run `ngrok http 1337` in a different tab. ngrok will forward packets to our local Nodejs server.
1. Keep the above tab open and in a new tab, run `npm install` to install all the dependencies
1. Run `npm run start` to start the local Nodejs/Express server
1. Visit http://localhost:1337/make-call button, you should receive a call
1. The audio should be streamed via WebSockets and you should see the buffer in your terminal