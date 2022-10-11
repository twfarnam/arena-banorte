import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sortBy from "lodash/sortBy";
import {Twilio} from "twilio";

admin.initializeApp(functions.config().firebase);

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const notifyServiceSID = process.env.TWILIO_NOTIFY_SERVICE_SID!;

export const score = functions.https.onCall(
    async (data, context) => {
      const uid = context.auth?.uid;
      if (!uid) {
        throw new functions.https.HttpsError(
            "unauthenticated", "requires auth",
        );
      }
      const triviaScores = await admin.firestore()
          .collection("triviaScores")
          .where("uid", "==", uid)
          .get();
      const triviaTotal = triviaScores
          .docs
          .reduce((sum, item) => sum + item.data().score, 0);
      const pacManScores = await admin.firestore()
          .collection("pacManScores")
          .where("uid", "==", uid)
          .get();
      const pacManTotal = pacManScores
          .docs
          .reduce((sum, item) => sum + item.data().score, 0);
      return triviaTotal + pacManTotal
    },
);

export const leaderBoard = functions.https.onCall(
    async (data, context) => {
      await requireAdmin(context);
      const users = await admin.firestore().collection("users").get();
      const triviaScores = await admin.firestore()
          .collection("triviaScores").get();
      const pacManScores = await admin.firestore()
          .collection("pacManScores").get();
      const result = users.docs.map(
          (u) => ({
            uid: u.id,
            name: u.data().name,
            phone: u.data().phone,
            email: u.data().email,
            score: 0,
          }),
      );
      result.forEach((user) => {
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
      return sortBy(result, (u) => u.score).reverse();
    },
);

export const broadcast = functions.https.onCall(
    async (data, context) => {
      await requireAdmin(context);
      if (!data.body) {
        throw new functions.https.HttpsError(
            "invalid-argument", "body is required",
        );
      }
      const {body} = data;
      const twilio = new Twilio(accountSid, authToken);
      const users = await admin.firestore().collection("users").get();
      const toBinding = users.docs.map(
          (u) => JSON.stringify({binding_type: "sms", address: u.data().phone}),
      );
      try {
        await twilio.notify
            .services(notifyServiceSID)
            .notifications.create({toBinding, body});
      } catch (error) {
        throw new functions.https.HttpsError(
            "internal", "Error sending messages :/",
        );
      }
      return {numberOfUsersMessaged: toBinding.length};
    }
);

async function requireAdmin(
    context: functions.https.CallableContext,
): Promise<boolean> {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
        "unauthenticated", "requires auth",
    );
  }
  const userAdminRow = await admin
      .firestore().collection("admins").doc(uid).get();
  if (!userAdminRow.exists) {
    throw new functions.https.HttpsError(
        "permission-denied", "not an admin",
    );
  }
  return true;
}
