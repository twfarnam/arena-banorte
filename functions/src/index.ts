import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sortBy from "lodash/sortBy";
import {Twilio} from "twilio";

admin.initializeApp(functions.config().firebase);

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const from = process.env.TWILIO_PHONE_NUMBER!;
const notifyServiceSID = process.env.TWILIO_NOTIFY_SERVICE_SID!;

export const leaderBoard = functions.https.onRequest(
    async (request, response) => {
      if (request.method != "GET") {
        response.send("method should be GET");
        return;
      }
      response.set("Access-Control-Allow-Origin", "*");
      const users = await admin.firestore().collection("users").get();
      const triviaScores = await admin.firestore()
          .collection("triviaScores").get();
      const pacManScores = await admin.firestore()
          .collection("pacManScores").get();
      const table = users.docs.map(
          (s) => ({uid: s.id, name: s.data().name, score: 0}),
      );
      table.forEach((user) => {
        const triviaTotal = triviaScores
            .docs
            .filter((score) => score.data().uid == user.uid)
            .reduce((sum, item) => sum + item.data().score, 0);
        const pacManTotal = pacManScores
            .docs
            .filter((score) => score.data().uid == user.uid)
            .reduce((sum, item) => sum + item.data().score, 0);
        user.score = triviaTotal + pacManTotal;
      });
      const sorted = sortBy(table, (u) => u.score).reverse().slice(0, 9);
      response.send(JSON.stringify(sorted));
    },
);

export const broadcast = functions.https.onCall(
    async (data, context) => {
      if (!data.body) {
        throw new functions.https.HttpsError(
            "invalid-argument", "body is required",
        );
      }
      // const uid = context.auth?.uid;
      // const hasPermission = uid == "";
      // if (!hasPermission) {
      //   throw new functions.https.HttpsError(
      //       "permission-denied", "not an admin",
      //   );
      // }
      const {body} = data;
      const twilio = new Twilio(accountSid, authToken);
      const notificationOpts = {
        toBinding: JSON.stringify({
          binding_type: "sms",
          address: "+52 55 2708 4244",
        }),
        body,
      };
      const notification = await twilio.notify
          .services(notifyServiceSID)
          .notifications.create(notificationOpts);
      console.log(notification);
      return "OK";
    }
);
