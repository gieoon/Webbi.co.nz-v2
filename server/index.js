
const S = require('./spreadsheet/spreadsheet.js');
const DB = require('./db/db.js');

const app = require('express')();
const PORT = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Receive endpoints
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/new', (req, res) => {
  // console.dir(req.get('Referrer'))
  DB.checkIfShortIdExists(req.query.shortId).then((document)=>{
    if(!document){
      console.log('Creating new document');
      createNewSpreadsheet(req.query.name, req.get('Referrer')).then((result)=>{
        // res.setHeader('Content-Type', 'text/html');
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify({link: shareableLink}));
        // console.log('shareableLink: ', shareableLink);
        DB.saveNewSpreadsheet(req.query.shortId, result.spreadsheetId);
        // console.log(result)
        res.json(result);
      })
    } else {
      console.log("Spreadsheet already exists, loading");
      S.getSharedLink(document.spreadsheetId).then((result)=>{
        res.json(result);
      })
      
    }
  })
});

app.get('/read', (req, res) => {
  console.log(req.query);
  S.readSpreadsheetData(req.query.spreadsheetId).then((result) => {
    // console.log("/read result: ", result);
    // res.json(result);
    res.send(JSON.stringify(result))
  })
})

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
})

const createNewSpreadsheet = async (name, referrer) => {
  const spreadsheetId = await S.createSpreadsheet(name);//await require('./db.js').getSpreadsheetIdAndCreateIfDoesntExist(userId, query.queryId, query.name);
  console.log('spreadsheetId: ', spreadsheetId);
  await S.createContentDefaults(spreadsheetId, name);
  await S.addSettingsSheet(spreadsheetId);
  await S.addSettingsDefaults(spreadsheetId);
  await S.updateSheetProperties(spreadsheetId, referrer);
  const result = await S.getSharedLink(spreadsheetId);
  // require('./db.js').saveSpreadsheetIdAndLinkToDB('new_user', query.queryId, spreadsheetId, shareableLink);
  console.log('shareableLink: ', result.shareableLink)
  return result;
}

