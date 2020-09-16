var admin = require('firebase-admin');

var serviceAccount = require("./sheets2website-1598313088115-firebase-adminsdk-qimn1-85abcb5d72.json");

const {
  SHORTIDS_COLLECTION, 
  SPREADSHEETS_COLLECTION
} = require('../constants');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sheets2website-1598313088115.firebaseio.com"
});

const db = admin.firestore();

exports.saveNewSpreadsheet = (shortId, spreadsheetId) => {
  const obj = {
    shortId: shortId,
    spreadsheetId: spreadsheetId,
    createdOn: admin.firestore.FieldValue.serverTimestamp(),
  };
  db.collection(SPREADSHEETS_COLLECTION)
    .doc(spreadsheetId)
    .set(obj).then(()=>{
      console.log('Successfully stored new spreadsheet');
    })
    .catch(err => console.error("Error saving spreadsheet to DB: ", err))
  db.collection(SHORTIDS_COLLECTION)
    .doc(shortId)
    .set(obj)
    .then(()=>{
      console.log('Successfully stored new shortId');
    })
}

// Only create a new spreadsheet if this shortIf has not been used
exports.checkIfShortIdExists = async (shortId) => {
  return db.collection(SHORTIDS_COLLECTION)
    .doc(shortId)
    .get()
    .then(snapshot => {
      // console.log(snapshot.data());
      return snapshot.data();//get('spreadsheetId');
      // if(snapshot.exists){
      //   return snapshot.get('spreadsheetId');
      // }
      // else {
      //   return false;
      // }
    })

  // return Promise.all(promise);
}

exports.getTemplateColumns = async (templateName) => {
  return db.collection('Constants')
      .doc('Templates')
      .get()
      .then((doc)=>{
        console.log('Retrieved templates: ', doc.get(templateName));
        return doc.get(templateName).columns;
      }).catch(err => {
        console.error("Error retrieving templates: ", err);
      })
}
