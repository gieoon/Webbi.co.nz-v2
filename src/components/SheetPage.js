import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TemplateSelector from './TemplateSelector';
import TemplateSwapper from './TemplateSwapper'
import {
    API_ENDPOINT,
    SHEETS_API_KEY
} from '../constants';
import {ingestSpreadsheetData} from '../utils/commonFunctions';

export default function SheetPage({

}){
    let { shortId, pageName } = useParams();

    const [shareableLink, setShareableLink] = useState(null);
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetData, setSheetData] = useState({}); 
    const [template, setTemplate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        //TODO remove this
        // readSpreadsheetData("11F3uY_e13j00-pqEbMRXfuG40QnfTZ4nqiWG169x2HA");
        // return //TODO remove this;
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
        
        fetch(`${API_ENDPOINT}/new?shortId=${shortId}&name=${pageName}`, options)
            .then(response => {
                // console.log(response);
                // return response.json();
                return response.json()
                    .then(function(json){
                        console.log(json)
                        setShareableLink(json.shareableLink);
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
        // fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=DIMENSION_UNSPECIFIED&ranges=Settings!A1:B8&ranges=A1:B8&valueRenderOption=UNFORMATTED_VALUE&key=${SHEETS_API_KEY}`,{
        //     // header: `Authorization: Bearer ${ACCESS_TOKEN}`,
        //     method: 'GET',
        //     // mode: 'no-cors',
        //     cache: 'no-cache',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     },
        // })
        fetch(`${API_ENDPOINT}/read?spreadsheetId=${spreadsheetId}`,{
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
                        console.log('json: ', json);
                        var d = ingestSpreadsheetData(json);
                        setSheetData(d);
                        setTemplate(d.Settings?.Template);
                        console.log(json, sheetData);
                        setLoading(false);
                    })
            })
    }

    const EditBtn = () => {
        return (
            <div className="EditBtn">
                <a href={shareableLink} rel="noopener noreferrer" target="_blank">
                    <span>Start editing your site</span>
                </a>
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
            {
                shareableLink && <TemplateSwapper template={template} setTemplate={setTemplate} />
            }
            <div>
                {/* <h2>{t('Your website')}</h2> */}
                {/* <h2>Your Website</h2> */}
                {/* <hr/> */}
                <div className="Template-wrapper">
                  <TemplateSelector template={template} sheetData={sheetData} />
                </div>
                {/* <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR7ldxMUU0El1dKqoTjw2ity1Ev_Tl_EwApkBG2OgoPPiUYjrYQ3e5b7pa4sDT9x8bncePp8kqh3rPq/pubhtml?widget=true&amp;headers=false" width="500px" height="500px"></iframe> */}
            </div>
            <div>
                {loading && <LoadingPopup />}
            </div>
        </div>  
    )
}

// Use useTrail here, to make it sparkle.
const LoadingPopup = () => {
    return(
        <div className="Loading">
            LOADING...
        </div>
    )
}