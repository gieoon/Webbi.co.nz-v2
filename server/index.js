
const S = require('./spreadsheet/spreadsheet.js');
const db = require('./db/db.js');

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
  console.log(req.query)
  createNewSpreadsheet(req.query.name).then((result)=>{
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({link: shareableLink}));
    // console.log('shareableLink: ', shareableLink);
    res.json(result);
  })
});

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
})

const createNewSpreadsheet = async (name) => {
  const spreadsheetId = await S.createSpreadsheet(name);//await require('./db.js').getSpreadsheetIdAndCreateIfDoesntExist(userId, query.queryId, query.name);
  console.log('spreadsheetId: ', spreadsheetId);
  await S.writeHeaders(spreadsheetId);
  await S.writeDefaults(spreadsheetId);
  await S.addSettingsSheet(spreadsheetId);
  await S.addSettingsDefaults(spreadsheetId);
  await S.updateSheetProperties(spreadsheetId);
  const result = await S.getSharedLink(spreadsheetId);
  // require('./db.js').saveSpreadsheetIdAndLinkToDB('new_user', query.queryId, spreadsheetId, shareableLink);
  console.log('shareableLink: ', result.shareableLink)
  return result;
}

