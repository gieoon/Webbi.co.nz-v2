import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    SHEETS_API_KEY,
    SHEETS_CLIENT_ID,
    SHEETS_DISCOVERY_DOCS,
    SHEETS_SCOPES,
} from '../constants';
// import t from '../translations';
import Template from './templates';
import { GoogleLogin } from 'react-google-login';

export default function SheetPage({
    
}){
    let { pageId } = useParams();

    const [sheetData, setSheetData] = useState({}); 

    useEffect(()=>{

    }, []);

    return(
        <div className="SheetPage">
            Sheet Page
            <br/>
            pageId: {pageId}

            {/* <div id='authorize_button' onClick={()=>{handleAuthClick()}}>Authorize</div>
            <div id='signout_button' onClick={()=>{handleSignoutClick()}}>Sign out</div> */}

            <GoogleLogin
              clientId={SHEETS_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <input placeholder='Website title' id="input-title" />

            <p>The content on your website is shown from this spreadsheet, edit it to update it.</p>
            {/* <div id="new_spreadsheet" onClick={()=>{
                createSpreadsheet((spreadsheetId)=>{
                    readSpreadsheet(spreadsheetId);
                })
                
            }}>Update Content</div> */}
            {/* Load template based on what is selected in the dropdown in the sheet */}
            <div>
                {/* <h2>{t('Your website')}</h2> */}
                <h2>Your Website</h2>
                {/* <hr/> */}
                <div className="Template-wrapper">
                  <Template sheetData={sheetData} />
                </div>
            </div>
        </div>
    )
}

const responseGoogle = (response) => {
  console.log(response);
}

// Initialization Google Sheets API


/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        appendPre('Name, Major:');
        for (var i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          appendPre(row[0] + ', ' + row[4]);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
}
/*
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    SHEETS_API_KEY,
    SHEETS_CLIENT_ID,
    SHEETS_DISCOVERY_DOCS,
    SHEETS_SCOPES,
} from '../constants';
// import t from '../translations';
import Template from './templates';
import { GoogleLogin } from 'react-google-login';

export default function SheetPage({
    
}){
    let { pageId } = useParams();

    const [sheetData, setSheetData] = useState({}); 

    useEffect(()=>{
        initGapi();
    }, []);

    return(
        <div className="SheetPage">
            Sheet Page
            <br/>
            pageId: {pageId}

            <div id='authorize_button' onClick={()=>{handleAuthClick()}}>Authorize</div>
            <div id='signout_button' onClick={()=>{handleSignoutClick()}}>Sign out</div>

            <GoogleLogin
              clientId={SHEETS_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <input placeholder='Website title' id="input-title" />

            <p>The content on your website is shown from this spreadsheet, edit it to update it.</p>
            <div id="new_spreadsheet" onClick={()=>{
                createSpreadsheet((spreadsheetId)=>{
                    readSpreadsheet(spreadsheetId);
                })
                
            }}>Update Content</div>
            
    )
}

const responseGoogle = (response) => {
  console.log(response);
}

const createSpreadsheet = async (cb) => {
    const title = Date.now().toString();
    //TODO add username and date and project title set by user
    window.gapi.client.sheets.spreadsheets.create({
        properties: {
          title: document.getElementById('input-title').value,
        }
    }).then((response) => {
        console.log('sheet creation response: ', response);
        cb(response.spreadsheetId);
    });
}

const readSpreadsheet = (spreadsheetId) => {
    window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'A1:A5' //TODO set this
    }).then((response) => {
        var result = response.result;
        var numRows = result.values ? result.values.length : 0;
        console.log(`${numRows} rows retrieved.`);
    });
}

// Initialization Google Sheets API

const initGapi = () => {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
}


const loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    console.log(script)
    if(script.getAttribute('gapi_processed')){
      console.log('Client is ready! Now you can access gapi. :)');
      if(window.location.hostname==='localhost'){
        window.gapi.client.load("http://localhost:3000/_ah/api/discovery/v1/apis/metafields/v1/rest")
        .then((response) => {
          console.log("Connected to metafields API locally.");
          },
          function (err) {
            console.log("Error connecting to metafields API locally.");
          }
        );
      }
      handleClientLoad();
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {loadClientWhenGapiReady(script)}, 100);
    }
}


function handleClientLoad() {
    window.gapi.load('client:auth2', initClient);
}
// Google Sheets API
function initClient() {
    window.gapi.client.init({
      apiKey: SHEETS_API_KEY,
      clientId: SHEETS_CLIENT_ID,
      discoveryDocs: SHEETS_DISCOVERY_DOCS,
      scope: SHEETS_SCOPES
    }).then(function (res) {
        console.log('Signed in!: ', res)
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // window.gapi.auth2.signIn();
      // Handle the initial sign-in state.
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

      // Get data and set it to state
      // setSheetData
    }, function(error) {

        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    console.log("Sign in status updated: ", isSignedIn,);
    if (isSignedIn) {
      document.getElementById('authorize_button').style.display = 'none';
      document.getElementById('signout_button').style.display = 'block';
      listMajors();
    } else {
      document.getElementById('authorize_button').style.display = 'block';
      document.getElementById('signout_button').style.display = 'none';
    }
}

function handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function listMajors() {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        appendPre('Name, Major:');
        for (var i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          appendPre(row[0] + ', ' + row[4]);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
}
*/