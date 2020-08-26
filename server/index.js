
const S = require('./spreadsheet.js');
const app = require('express')();

// Receive endpoints

const createNewSpreadsheet = () => {

}

var shareableLink;
query.spreadsheetId = await SS.createSpreadsheet(query.name);//await require('./db.js').getSpreadsheetIdAndCreateIfDoesntExist(userId, query.queryId, query.name);

SS.writeHeaders(query.spreadsheetId);
shareableLink = await SS.getSharedLink(query.spreadsheetId);
require('../db.js').saveSpreadsheetIdAndLinkToDB(user.username, query.queryId, query.spreadsheetId, shareableLink);