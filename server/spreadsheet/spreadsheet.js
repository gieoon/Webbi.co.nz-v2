const { GoogleSpreadsheet } = require('google-spreadsheet');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const SCOPES = [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
];

var auth;

const init = async () => {
	
	// spreadsheet key is the long id in the sheets URL
	// const doc = new GoogleSpreadsheet('1fL0rD6ee89CKTPyewDWoC0Eu-IXvN77esSceTXlVPVg');
	
	// await doc.useServiceAccountAuth(
	// 	require('./sheets2website-1598313088115-2e587adb38c8.json')
	// );
	// console.log(doc)
	process.env.GOOGLE_APPLICATION_CREDENTIALS = './spreadsheet/sheets2website-1598313088115-2e587adb38c8.json';
	auth = await getAuthToken();
	// console.log(auth)
	sheets = google.sheets({version: 'v4', auth});

	// await doc.loadInfo(); // loads document properties and worksheets
	// console.log(doc.title);
	// await doc.updateProperties({ title: 'renamed doc' });
	
	// const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
	// console.log(sheet.title);
	// console.log(sheet.rowCount);
	
	// adding / removing sheets
	// const newSheet = await doc.addSheet({ title: 'hot new sheet!' });

	// exports.createSpreadsheet('Test sheet');
}
init();

async function getAuthToken() {
	const auth = new GoogleAuth({
	  scopes: SCOPES
	});
	const authToken = await auth.getClient();
	return authToken;
}


exports.writeHeaders = function(spreadsheetId){
	console.log('writing default headers');
	let values = [
		['Page Title'], 
		['Header at Top'], 
		['Section'], 
		['Section'], 
		['Section']
	];
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: 'A1:A5', // 'A1:A'
		valueInputOption: 'USER_ENTERED',
		resource
	};
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error writing default headers to spreadsheet: ', err);
			return;
		}
		// console.log('Successfully wrote default headers: ', JSON.stringify(response, null, 2));
	});
}

exports.writeDefaults = function(spreadsheetId){
	console.log('Writing default data');
	let values = [
		['My Custom Website'], 
		['My Custom Website'], 
		['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'],
		['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'],
		['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum']
	];
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: 'B1:B5',
		valueInputOption: 'USER_ENTERED',
		resource
	};
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error writing default headers to spreadsheet: ', err);
			return;
		}
		// console.log('Successfully wrote default content: ', JSON.stringify(response, null, 2));
	});
}

exports.createSpreadsheet = async function(title){
	const resource = {
		properties: { 
      		title,
		},
		sheets: [
			{
				properties: {
					title: 'Content' 
				}
			}
		],
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
					// addParents: ['1vnUr84zE7rMoHB94DVx_lLloYYgsbdrq'],
					addParents: ['1_O5Ichm7WXVI4sYuOiDbc4ZjB8zayyPV'],
					removeParents: 'root',
					fileId: fileId
				};
				const drive = google.drive({ version: 'v3', auth: auth });
				drive.files.update(move, function(e,d){
					if(e){
						console.error('Error moving spreadsheet: ', e.response.data.error.message, e.errors.message);
						// reject('Error moving spreadsheet: ', e);
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

exports.addSettingsSheet = async function(spreadsheetId){
	await sheets.spreadsheets.batchUpdate({
		spreadsheetId: spreadsheetId,
		requestBody: {
		  requests: [{
			addSheet: {
			  properties: {
				title: 'Settings',
			  }
			},
		  }]
		}
	})
}

const getSheetIdFromName = async (spreadsheetId) => {
	const request = {
        spreadsheetId: spreadsheetId,
        // ranges: [sheetname],
        includeGridData: false,  
        auth: auth,
    };

	res = await sheets.spreadsheets.get(request)
	return res;
}

exports.updateSheetProperties = async function(spreadsheetId){
	// Retrieve sheet Id's, then update the right ones.
	var _sheets = await getSheetIdFromName(spreadsheetId) // 'Settings
	_sheets = _sheets.data.sheets;
	// https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId?&fields=sheets.properties

	for(var sheet of _sheets){
		console.log(sheet)
		var sheetId = sheet.properties.sheetId;
		var sheetTitle = sheet.properties.title;
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId: spreadsheetId,
			requestBody: {
				requests: [{
					// Update first column to be wider
					updateDimensionProperties: {
						range: {
							sheetId: sheetId,
							dimension: "COLUMNS",
							startIndex: 0,
							endIndex: 2
						},
						properties: {
							pixelSize: 260,
						},
						fields: "pixelSize"
					}
				}]
			}
		})
		// Update Content sheet by itself.
		if(sheetTitle === 'Settings')
			await createTemplatesDropdown(spreadsheetId, sheetId);
	}
}


const createTemplatesDropdown = async (spreadsheetId, sheetId) => {
	// console.log('createTemplatesDropdown')
	await sheets.spreadsheets.batchUpdate({
		spreadsheetId: spreadsheetId,
		requestBody: {
			requests: [
				{
					// Add the templates options dropdown list
					setDataValidation: {
						range: {
							sheetId: sheetId,
							startRowIndex: 0,
							endRowIndex: 1,
							startColumnIndex: 1,
							endColumnIndex: 2,
						},
						rule: {
							condition: {
								type: "ONE_OF_LIST",
								values: [
									{userEnteredValue: "Basic"},
									{userEnteredValue: "Job Listing Website"},
									{userEnteredValue: "Event Website"}
								]
							},
							inputMessage: 'Select a template',
							strict: true,
							showCustomUi: true,
						}
					},
				},
				{ // Primary Background Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 0.25,
										green: 0.25,
										blue: 1,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 2,
							endRowIndex: 3,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Hovered Background Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 1,
										green: 0.25,
										blue: 0.25,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 3,
							endRowIndex: 4,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Text Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 1,
										green: 1,
										blue: 1,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 4,
							endRowIndex: 5,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section Background Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 0,
										green: 0,
										blue: 0,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 5,
							endRowIndex: 6,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section Background Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 1,
										green: 0.5,
										blue: 0.5,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 6,
							endRowIndex: 7,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section Background Color
					updateCells: {
						rows: [{
							values: [{
								userEnteredFormat: {
									backgroundColor: {
										red: 1,
										green: 1,
										blue: 0.25,
										alpha: 1.0,
									},
								},
							}]
						}],
						fields: "*", //"userEnteredFormat,userEnteredValue"
						range: {
							sheetId: sheetId,
							startRowIndex: 7,
							endRowIndex: 8,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				}
			]
		}
	})
}


exports.addSettingsDefaults = async function(spreadsheetId){
	let values = [
		['Template', 'Basic'], // Default to Basic template
		[],
		['Primary Background Color', 'blue'], 
		['Hovered Background Color', 'green'], 
		['Text Color', 'white'],
		['Section Background Color', 'black'],
		['Section Background Color', 'red'],
		['Section Background Color', '#FF0'],
	];
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: "Settings!A1:B8",
		valueInputOption: 'USER_ENTERED',
		resource
	};
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error writing default headers to spreadsheet: ', err);
			return;
		}
		else {
			// console.log('%d cells updated.', response.updatedCells);
		}
		// console.log('Successfully wrote default content: ', JSON.stringify(response, null, 2));
	});
}

exports.getSharedLink = async function(fileId){
	var promise = new Promise(function(resolve, reject){
		const drive = google.drive({ version: 'v3', auth: auth });
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
				resolve({shareableLink: result.data.webViewLink, spreadsheetId: fileId});
			}
		});
	});
	return promise.then((result)=>{
		return result;
	}, (err)=>{
		console.error("Failed to retrieve SharedLink: ", err);
	});
}

// USING OAUTH
// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets',
// 				"https://www.googleapis.com/auth/drive.file", 
// 				"https://www.googleapis.com/auth/drive"];

// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// var sheets,
// 	oAuth2Client;

// fs.readFile(__dirname + '/credentials.json', (err, content) => {
// 	console.log('Loading spreadsheet credentials');
//   	if (err) return console.log('Error loading client secret file:', err);
//   	// Authorize a client with credentials, then call the Google Sheets API.
//   	authorize(JSON.parse(content), listMajors);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
// 	const {client_secret, client_id, redirect_uris} = credentials.web;
// 	oAuth2Client = new google.auth.OAuth2(
// 	  client_id, client_secret, redirect_uris[0]);
// 	// Check if we have previously stored a token.
// 	fs.readFile(TOKEN_PATH, (err, token) => {
// 		if (err) return getNewToken(oAuth2Client, callback);
// 		oAuth2Client.setCredentials(JSON.parse(token));
// 		callback(oAuth2Client);
// 	});
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error while trying to retrieve access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }


// function listMajors(auth) {
// 	sheets = google.sheets({version: 'v4', auth});
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
// }

// //https://github.com/gsuitedevs/node-samples/blob/master/sheets/snippets/snippets.js
// exports.appendToSpreadsheet = function(spreadsheetId, saveTime, query, data){
// 	console.log('APPENDING data to spreadsheet: ', data);
// 	console.log('saveTime set to: ', saveTime);
// 	let values = [];
// 	for(obj of data){
// 		//console.log('writing obj: ', obj);
// 		let step = query.steps[obj.stepNo];
// 		const a = [
// 			//date.getDay(saveTime) + ' ' + date.getTime(saveTime),
// 			saveTime,
// 			obj.stepNo,
// 			step.description,
// 			obj.url,
// 			obj.value || obj.passed
// 		];
// 		values.push(a);
// 	}
	
// 	var resource = {
// 		values,
// 	}
// 	var request = {
// 		spreadsheetId: spreadsheetId,
// 		range: 'A1:ZZ',
// 		valueInputOption: 'USER_ENTERED',
// 		insertDataOption: 'INSERT_ROWS',
// 		resource
// 	};
	
// 	sheets.spreadsheets.values.append(request, function(err, response){
// 		if(err){
// 			console.error('Error appending to spreadsheet: ', err);
// 			return;
// 		}
// 		console.log('Successfully appended: ', response.data.tableRange);
// 	});
// 	//sheets.spreadsheets.batchUpdate();
// 	// spreadsheet.values.batchUpdate
// }



// function freezeFirstRow(spreadsheetId){
// 	console.log('freezing first row');
// 	// const gridProperties = {
// 	// 	frozenRowCount: 1,
// 	// }
// 	let requests = [];
// 	requests.push({
// 		updateSheetProperties: {
// 			properties: {
// 				gridProperties: {
// 					rowCount: 50,
// 					columnCount: 5,
// 					frozenRowCount: 1
// 				}
// 			},
// 			fields: 'gridProperties',
// 		},
// 	})

// 	const batchUpdateRequest = {requests};
// 	sheets.spreadsheets.batchUpdate({
// 		spreadsheetId,
// 		resource: batchUpdateRequest,
// 	}, function(err, response){
// 		if(err) {
// 			console.error('ERROR freezing first row: ', err);
// 			return;
// 		}
// 		//console.log('FROZE FIRST ROW with response: ', JSON.stringify(response, null, 2));
// 	});
// 	// sheets.spreadsheets.get(request, function(err, response){
// 	// 	if(err){
// 	// 		console.error('ERROR freezing first row: ', err);
// 	// 		return;
// 	// 	}
// 	// 	console.log('FROZE FIRST ROW with response: ', JSON.stringify(response, null, 2));
// 	// })
// }