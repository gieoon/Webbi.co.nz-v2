export const ENVIRONMENT = 
    "DEVELOP"; 
    // "PRODUCTION";

export const API_ENDPOINT = ENVIRONMENT === "DEVELOP" 
    ? 'http://localhost:8080' 
    : "https://sheets2website-1598313088115.ts.r.appspot.com";

export const SHEETS_API_KEY = 'AIzaSyDEVhwjTDpZuUVGE5jjQWCVssC9nKWVgdY';

export const SHEETS_CLIENT_ID = '1082271392691-pq78njjh3pkikovinunt5v2134tj7gv1.apps.googleusercontent.com';

export const SHEETS_DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
export const SHEETS_SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
/*
export const SHEETS_SCOPES = [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
];
*/