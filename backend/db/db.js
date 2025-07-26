const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("✅ Firebase initialized");


const db = admin.firestore();
module.exports = db;
