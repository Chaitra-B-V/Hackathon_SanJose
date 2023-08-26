declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_AUTH_TOKEN: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_APP_SID: string;
      DIAL_TO_NUMBER: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
