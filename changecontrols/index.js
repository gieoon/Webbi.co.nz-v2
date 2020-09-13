var admin = require('firebase-admin');

var serviceAccount = require("../server/db/sheets2website-1598313088115-firebase-adminsdk-qimn1-58d0982397.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sheets2website-1598313088115.firebaseio.com"
});

// const db = admin.firestore();

module.exports = admin.firestore();
