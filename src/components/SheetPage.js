import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TemplateSelector from './TemplateSelector';
import TemplateSwapper from './TemplateSwapper'
import {
    Edit
} from 'react-feather';

import {
    API_ENDPOINT
} from '../constants';
import {ingestSpreadsheetData} from '../utils/commonFunctions';

export default function SheetPage({

}){
    let { shortId, pageName } = useParams();

    const [shareableLink, setShareableLink] = useState(null);
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetData, setSheetData] = useState([]); 
    const [template, setTemplate] = useState("");
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
                        console.log(json);
                        var d = ingestSpreadsheetData(json);
                        // console.log('d: ', d);
                        setSheetData(d);
                        // setTemplate(d.Settings?.Template);
                        setTemplate("BASIC");
                        // console.log(json, d);
                        setLoading(false);
                    })
            })
    }

    const EditBtn = () => {
        return (
            <div className="EditBtn">
                <a href={shareableLink} rel="noopener noreferrer" target="_blank">
                    <span>Edit your content</span>
                    <Edit />
                </a>
            </div>
        )
    }

    const Preview = () => {
        return (
            <div className="Preview">
                <span>Preview</span>
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
            { shareableLink && <Preview /> }

            {/* <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSBGMn0tCspTTTNjYdLIOtkbh1jG3HBVS66m0kVe8sxSjnyjQGNJpj4OtpOloGofV98mCnHWFNSMQx2/pubhtml?gid=193262248&amp;single=true&amp;widget=true&amp;headers=false&amp;range=A15:A16"></iframe> */}
            {/* <iframe src="https://docs.google.com/spreadsheets/d/1YGIyDLS66GQv-0CKvmli079MahSutcIqWQl2eYqL_58/pubhtml?widget=true&headers=false&embedded=true"></iframe> */}
            
            <div>
                <div className="Template-wrapper">
                  <TemplateSelector template={template} sheetData={sheetData} />
                </div>
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