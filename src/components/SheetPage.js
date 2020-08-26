import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Template from './templates';
import {
    API_ENDPOINT,
    SHEETS_API_KEY
} from '../constants';

export default function SheetPage({

}){
    let { pageName } = useParams();

    const [shareableLink, setShareableLink] = useState(null);
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetData, setSheetData] = useState({}); 
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const options = {
            method: 'GET',
            // mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
        fetch(`${API_ENDPOINT}/new?name=${pageName}`, options)
            .then(response => {
                // console.log(response);
                // return response.json();
                return response.json()
                    .then(function(json){
                        console.log(json)
                        setShareableLink(json.link);
                        // Get all data in spreadsheet
                        setSpreadsheetId(json.spreadsheetId)
                        readSpreadsheetData(json.spreadsheetId);
                        return {link: json.link, spreadsheetId: json.spreadsheetId};
                    })
            })
            
            .catch(err => {
                console.log("error fetching data: ", err)
            })
    }, []);

    const readSpreadsheetData = (spreadsheetId) => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=DIMENSION_UNSPECIFIED&ranges=Settings!A1:B8&ranges=A1:B8&valueRenderOption=UNFORMATTED_VALUE&key=${SHEETS_API_KEY}`,{
            // header: `Authorization: Bearer ${ACCESS_TOKEN}`,
            method: 'GET',
            // mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(res => {
            return res.json()
                .then(json => {
                    console.log("json: ", json);
                })
        })
    }

    const EditBtn = () => {
        return (
            <div className="EditBtn">
                <a href={shareableLink} rel="noopener noreferrer" target="_blank">Start editing your website.</a>
            </div>
        )
    }

    return(
        <div className="SheetPage">
            {/* <input placeholder='Website title' id="input-title" /> */}
            {/* <div onClick={magic()}>Start new website</div> */}
            { shareableLink &&
                <EditBtn />
            }
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