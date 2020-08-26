const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets',
				"https://www.googleapis.com/auth/drive.file", 
				"https://www.googleapis.com/auth/drive"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

var sheets,
	oAuth2Client;

fs.readFile(__dirname + '/credentials.json', (err, content) => {
	console.log('Loading spreadsheet credentials');
  	if (err) return console.log('Error loading client secret file:', err);
  	// Authorize a client with credentials, then call the Google Sheets API.
  	authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	oAuth2Client = new google.auth.OAuth2(
	  client_id, client_secret, redirect_uris[0]);
	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function listMajors(auth) {
	sheets = google.sheets({version: 'v4', auth});
	// sheets.spreadsheets.values.get({
	//   spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
	//   range: 'Class Data!A2:E',
	// }, (err, res) => {
	//   if (err) return console.log('The API returned an error: ' + err);
	//   const rows = res.data.values;
	//   if (rows.length) {
	//     console.log('Name, Major:');
	//     // Print columns A and E, which correspond to indices 0 and 4.
	//     rows.map((row) => {
	//       console.log(`${row[0]}, ${row[4]}`);
	//     });
	//   } else {
	//     console.log('No data found.');
	//   }
	// });
	//createSpreadsheet("test spreadsheet creation");
}

//https://github.com/gsuitedevs/node-samples/blob/master/sheets/snippets/snippets.js
exports.appendToSpreadsheet = function(spreadsheetId, saveTime, query, data){
	console.log('APPENDING data to spreadsheet: ', data);
	console.log('saveTime set to: ', saveTime);
	let values = [];
	for(obj of data){
		//console.log('writing obj: ', obj);
		let step = query.steps[obj.stepNo];
		const a = [
			//date.getDay(saveTime) + ' ' + date.getTime(saveTime),
			saveTime,
			obj.stepNo,
			step.description,
			obj.url,
			obj.value || obj.passed
		];
		values.push(a);
	}
	
	var resource = {
		values,
	}
	var request = {
		spreadsheetId: spreadsheetId,
		range: 'A1:ZZ',
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
		resource
	};
	
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error appending to spreadsheet: ', err);
			return;
		}
		console.log('Successfully appended: ', response.data.tableRange);
	});
	//sheets.spreadsheets.batchUpdate();
	// spreadsheet.values.batchUpdate
}

exports.writeHeaders = function(spreadsheetId){
	console.log('writing default headers');
	let values = [[
		'When', 'Step Number', 'Description', 'URL', 'Data'
	]];
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: 'A1:A',
		valueInputOption: 'USER_ENTERED',
		resource
	};
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error writing default headers to spreadsheet: ', err);
			return;
		}
		//console.log('Successfully wrote default headers: ', JSON.stringify(response, null, 2));
		freezeFirstRow(spreadsheetId);
	});
}

function freezeFirstRow(spreadsheetId){
	console.log('freezing first row');
	// const gridProperties = {
	// 	frozenRowCount: 1,
	// }
	let requests = [];
	requests.push({
		updateSheetProperties: {
			properties: {
				gridProperties: {
					rowCount: 50,
					columnCount: 5,
					frozenRowCount: 1
				}
			},
			fields: 'gridProperties',
		},
	})

	const batchUpdateRequest = {requests};
	sheets.spreadsheets.batchUpdate({
		spreadsheetId,
		resource: batchUpdateRequest,
	}, function(err, response){
		if(err) {
			console.error('ERROR freezing first row: ', err);
			return;
		}
		//console.log('FROZE FIRST ROW with response: ', JSON.stringify(response, null, 2));
	});
	// sheets.spreadsheets.get(request, function(err, response){
	// 	if(err){
	// 		console.error('ERROR freezing first row: ', err);
	// 		return;
	// 	}
	// 	console.log('FROZE FIRST ROW with response: ', JSON.stringify(response, null, 2));
	// })
}

exports.createSpreadsheet = async function(title){
	const resource = {
		properties: { 
      		title,
      	},
  	};
  	var spreadsheetId;
  	var promise = new Promise(function(resolve, reject){
  		sheets.spreadsheets.create({
	      	resource,
	      	//spreadsheetId: spreadsheetId,
	      	//fields: {spreadsheetId: `${spreadsheetId}`},
			fields: 'spreadsheetId',
			//auth: oAuth2Client
		}, (err, response)=> {
			if(err){
				console.error('ERROR creating spreadsheet: ', err);
				reject('ERROR creating spreadsheet');
			} else {
				let fileId = response.data.spreadsheetId;
				let move = {
					addParents: ['1vnUr84zE7rMoHB94DVx_lLloYYgsbdrq'],
					removeParents: 'root',
					fileId: fileId
				};
				const drive = google.drive({ version: 'v3', auth: oAuth2Client });
				drive.files.update(move, function(e,d){
					if(e){
						//console.error('Error moving spreadsheet: ', e);
						reject('Error moving spreadsheet');
					}
					//console.log('spreadsheet moved successfully')
					//console.log('success creating Spreadsheet: ', response.data.spreadsheetId);

					spreadsheetId = response.data.spreadsheetId;


					//write headers

					resolve(spreadsheetId);
				});
			}
			//console.log('Got response: ', JSON.stringify(response, null, 2));
		});
  	});
	return promise.then((result)=>{
		//console.log('promise returning: ', result);
  		spreadsheetId = result;
  		return result;
  	}, (err)=>{
  		console.error("failed: ", err );
  	});
}

exports.getSharedLink = async function(fileId){
	var promise = new Promise(function(resolve, reject){
		const drive = google.drive({ version: 'v3', auth: oAuth2Client });
		drive.files.get({
			fileId: fileId,
			fields: 'webViewLink'
		}, function(err, result){
			if(err) {
				console.error(err);
				reject("Could not retrieve sharedLink");
			}
			else {
				//console.log('Got shared link: ', result.data.webViewLink);
				resolve(result.data.webViewLink);
			}
		});
	});
	return promise.then((result)=>{
		return result;
	}, (err)=>{
		console.error("Failed to retrieve SharedLink: ", err);
	});
}
