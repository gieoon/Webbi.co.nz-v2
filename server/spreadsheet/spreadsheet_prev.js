// const { GoogleSpreadsheet } = require('google-spreadsheet');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

const {SPREADSHEET_READ_RANGES} = require('../constants.js');
const { promises } = require('dns');

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
	process.env.GOOGLE_APPLICATION_CREDENTIALS = './spreadsheet/sheets2website-1598313088115-2e587adb38c8.json';
	auth = await getAuthToken();
	sheets = google.sheets({version: 'v4', auth});

	// await doc.loadInfo(); // loads document properties and worksheets
	// await doc.updateProperties({ title: 'renamed doc' });
	
	// const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
	
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

exports.createContentDefaults = function(spreadsheetId, name){
	// Add empty spaces to stop overflowing
	/*
	const values = [
		['Page Element','Content','Background Color', 'Text Color', 'Font Size', 'Border Radius'],
		['Page Title', name,' ', ' ', ' '], 
		['Header at Top','My New Website',' ', '', ''], 
		['Section 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',' ', '', ''],
		['Section 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',' ', '', ''],
		['Section 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',' ', '', ''],
		['Email', 'example@gmail.com',' ', '', ''],
		['Phone Number', '0221231232',' ', '', ''],
		['Mobile Number', '0221231232',' ', '', ''],
		['Facebook', 'https://facebook.com/',' ', '', ''],
		['LinkedIn', 'https://linkedin.com',' ', '', ''],
		['Instagram', 'https://instagram.com',' ', '', ''],
		['Twitter', 'https://twitter.com',' ', '', ''],
		['Footer', 'Built with Webbi',' ', '', ''],
	];
	*/
	// Adding new data so most of this is done in frontend, and only list is in backend.
	const values = [
		['Name','Image link','Description','Date', 'Price', 'Additional content']
	];
	// console.dir(values);
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: `Content!A1:G${values.length}`,
		// range: "Content!A1:E20",
		valueInputOption: 'USER_ENTERED',
		resource
	};
	sheets.spreadsheets.values.append(request, function(err, response){
		if(err){
			console.error('Error writing default headers to spreadsheet: ', err);
			return;
		}
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
					spreadsheetId = response.data.spreadsheetId;


					//write headers

					resolve(spreadsheetId);
				});
			}
			//console.log('Got response: ', JSON.stringify(response, null, 2));
		});
  	});
	return promise.then((result)=>{
  		spreadsheetId = result;
  		return result;
  	}, (err)=>{
  		console.error("failed: ", err );
  	});
}
/*
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
*/
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

exports.updateSheetProperties = async function(spreadsheetId, referrer){
	// Retrieve sheet Id's, then update the right ones.
	var _sheets = await getSheetIdFromName(spreadsheetId) // 'Settings
	_sheets = _sheets.data.sheets;
	// https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId?&fields=sheets.properties

	for(var sheet of _sheets){
		var sheetId = sheet.properties.sheetId;
		var sheetTitle = sheet.properties.title;
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId: spreadsheetId,
			requestBody: {
				requests: [
					{
						updateDimensionProperties: {
							range: {
								sheetId: sheetId,
								dimension: "COLUMNS",
								startIndex: 2,
								endIndex: 5
							},
							properties: {
								pixelSize: 150,
							},
							fields: "pixelSize"
						},
					},
					{// Update first two columns to be wider
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
						},
					},
					{
						// Preview Button Hyperlink
						updateCells: {
							rows: [{
								values: [{
									// hyperlink: referrer, // READONLY
									userEnteredValue: {
										// stringValue: 'Preview your website',
										formulaValue: `=HYPERLINK("${referrer}","Preview your website")`
									},
								}]
							}],
							fields: '*',
							range: {
								sheetId: sheetId,
								startRowIndex: 0,
								endRowIndex: 1,
								startColumnIndex: 5,
								endColumnIndex: 6,
							},
						}
					}
				]
			}
		})
		// Update Specific Sheet
		// if(sheetTitle === 'Settings'){
		// 	await createSettingsDefault(spreadsheetId, sheetId, referrer);
		// }
		if(sheetTitle === 'Content'){
			await createContentCSSDefaults(spreadsheetId, sheetId);
			await freezeFirstRow(spreadsheetId, sheetId);
		}
	}
}

const createContentCSSDefaults = async (spreadsheetId, sheetId) => {
	const values = [];
	// for(var y=0;y<13;y++){
	// 	for(var x=0;x<2;x++){  
	// 		values.push(
	// 			{ 
	// 				updateCells: {
	// 					rows: [{
	// 						values: [{
	// 							userEnteredFormat: {
	// 								backgroundColor: {
	// 									red: x === 0 ? 0 : 1, //Math.random(),
	// 									green: x === 0 ? 0 : 1, //Math.random(),
	// 									blue: x === 0 ? 0 : 1, //Math.random(),
	// 									alpha: 1.0,
	// 								},
	// 							},
	// 						}]
	// 					}],
	// 					fields: "*",
	// 					range: {
	// 						sheetId: sheetId,
	// 						startRowIndex: y + 1,
	// 						endRowIndex: y + 1 + 1,
	// 						startColumnIndex: x + 2,
	// 						endColumnIndex: x + 2 + 1,
	// 					}
	// 				}
	// 			},
	// 		);
	// 	}
	// }
	// Stylize Header
	for(var x=0;x<6;x++){
		values.push(
			{ 
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
								textFormat: {
									foregroundColor: {
										red: 1,
										green: 1,
										blue: 1,
										alpha: 1.0,
									},
									bold: true,
									fontSize: 11,
								},
								horizontalAlignment: "CENTER",
							},
							// userEnteredValue: {
							// 	stringValue: 'Hello World'
							// }
						}]
					}],
					fields: "userEnteredFormat",//,userEnteredValue"
					range: {
						sheetId: sheetId,
						startRowIndex: 0,
						endRowIndex: 1,
						startColumnIndex: x,
						endColumnIndex: x + 1,
					}
				}
			},
		)
	}

	await sheets.spreadsheets.batchUpdate({
		spreadsheetId: spreadsheetId,
		requestBody: {
			requests: values
		}
	})
}

/*
const createSettingsDefault = async (spreadsheetId, sheetId, referrer) => {
	await sheets.spreadsheets.batchUpdate({
		spreadsheetId: spreadsheetId,
		requestBody: {
			requests: [
				{
					// Add the templates options dropdown list
					setDataValidation: {
						range: {
							sheetId: sheetId,
							startRowIndex: 2,
							endRowIndex: 3,
							startColumnIndex: 1,
							endColumnIndex: 2,
						},
						rule: {
							condition: {
								type: "ONE_OF_LIST",
								values: [
									{userEnteredValue: "Basic"},
									{userEnteredValue: "Portfolio"},
									{userEnteredValue: "Job Listing Website"},
									{userEnteredValue: "News Website"}
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
							startRowIndex: 4,
							endRowIndex: 5,
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
							startRowIndex: 5,
							endRowIndex: 6,
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
							startRowIndex: 6,
							endRowIndex: 7,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section 1 Background Color
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
							startRowIndex: 7,
							endRowIndex: 8,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section 2 Background Color
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
							startRowIndex: 8,
							endRowIndex: 9,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{ // Section 3 Background Color
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
							startRowIndex: 9,
							endRowIndex: 10,
							startColumnIndex: 1,
							endColumnIndex: 2,
						}
					}
				},
				{
					// Preview Button Hyperlink
					updateCells: {
						rows: [{
							values: [{
								// hyperlink: referrer, // READONLY
								userEnteredValue: {
									// stringValue: 'Preview your website',
									formulaValue: `=HYPERLINK("${referrer}","Preview your website")`
								},
							}]
						}],
						fields: '*',
						range: {
							sheetId: sheetId,
							startRowIndex: 0,
							endRowIndex: 1,
							startColumnIndex: 0,
							endColumnIndex: 1,
						},
					}
				}
			]
		}
	})
}
*/
/*
exports.addSettingsDefaults = async function(spreadsheetId){
	let values = [
		['Preview your website'],
		[],
		['Template', 'Basic','',], // Default to Basic template
		[],
		['Primary Background Color', 'blue'], 
		['Hovered Background Color', 'green'], 
		['Text Color', 'white'],
		['Section 1 Background Color', 'black'],
		['Section 2 Background Color', 'red'],
		['Section 3 Background Color', '#FF0'],
	];
	var resource = { values };
	var request = {
		spreadsheetId: spreadsheetId,
		range: `Settings!A1:${values.length}`,
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

	});
}
*/

exports.readSpreadsheetData = async (spreadsheetId) => {
	let ranges = SPREADSHEET_READ_RANGES;

	const promise = new Promise((resolve, reject)=>{
	// const promises = [];
	// for(var range of ranges){
		// promises.push(
			// sheets.spreadsheets.values.batchGet({
			sheets.spreadsheets.get({
				spreadsheetId,
				ranges, // range,
				includeGridData: true
			}, (err, result) => {
				if (err) {
					console.log("Could not retrieve spreadsheet data 1: ", err);
					// return {};
					reject("Could not retrieve spreadsheet data 1: ", err);
				} else {
					console.dir(result.data.sheets[0].data);
					// resolve(result.data.valueRanges);
					resolve([
						{...{rowData: result.data.sheets[0].data[0].rowData || [[]]}, ...{sheetName: 'Content'}}, 
						// {...{rowData: result.data.sheets[1].data[0].rowData}, ...{sheetName: 'Settings'}},
					]);
					// return result.data.valueRanges;
				}
			})
		})
		// )
	// }
	// return Promise.all(promises).then((result)=>{
	return promise.then(result => {
		return result;
	}, (err)=>{
		console.error("Failed to retrieve spreadsheet data 2: ", err);
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
				reject("Could not retrieve sharedLink: ", err);
			}
			else {

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


const freezeFirstRow = async (spreadsheetId, sheetId) => {
	let requests = [];
	requests.push({
		updateSheetProperties: {
			properties: {
				sheetId: sheetId,
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
		} else {
			// console.log('Froze first row');
		}
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


