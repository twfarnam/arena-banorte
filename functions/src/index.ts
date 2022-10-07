import * as functions from "firebase-functions";
import {Twilio} from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const from = process.env.TWILIO_PHONE_NUMBER!;

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const verifications = functions.https.onRequest(
    async (request, response) => {
      try {
        if (request.method == "OPTIONS") {
          response.set("Access-Control-Allow-Origin", "*");
          response.set("Access-Control-Allow-Methods", "POST");
          response.set("Access-Control-Allow-Headers", "Content-Type");
          response.status(204);
          response.send("");
          return;
        }
        if (request.method != "POST") {
          response.send("method should be POST");
        }
        if (!request.body) {
          response.send("need body");
          return;
        }
        const {phoneNumber} = request.body;
        const twilio = new Twilio(accountSid, authToken);
        const code = Math.random().toString().slice(2, 8);
        const message = await twilio.messages.create({
          body: `Para confirmar tu número entra el código ${code}`,
          to: phoneNumber,
          from,
        });
        console.log(message);
        response.send("OK");
      } catch (error: unknown) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        response.status(500).send(error?.message || "Error");
      }
    }
);
