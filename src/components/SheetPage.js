import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TemplateRenderer from './TemplateRenderer';
import TemplateSwapper from './TemplateSwapper'
import SettingsPopup from './SettingsPopup';
import Loading from './Loading';
import {
    Edit, 
    Grid,
    Paperclip,
    Settings,
    Check,
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
    const [template, setTemplate] = useState("LandingPage");
    const [templateShowing, setTemplateShowing] = useState(false);
    const [websiteContent, setWebsiteContent] = useState({});
    const [settingsPopupShowing, setSettingsPopupShowing] = useState(false);
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

        loadConfigurationFromDB(shortId).then((userConfiguration)=>{
            console.log('userconfiguration: ', userConfiguration)
        })

        loadCurrentWebsiteContentFromDB(shortId, (c)=>{setWebsiteContent(c)});
        
        fetch(`${API_ENDPOINT}/new?shortId=${shortId}&name=${pageName}&templateName=${template}`, options)
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
                        setTemplate("LANDING_PAGE");
                        // console.log(json, d);
                        setLoading(false);
                    })
            })
    }

    const EditBtn = () => {
        return (
            <div className="EditBtn">
                <div>
                    <a id="spreadsheetLink" href={shareableLink} rel="noopener noreferrer" target="_blank">
                    {/* <span>Edit your content</span> */}
                        <Grid className="SheetSVG" />
                    </a>
                </div>
                <div onClick={()=>{setTemplateShowing(!templateShowing)}}>
                    {/* <span>Templates </span> */}
                    <Paperclip color="white" className="SheetSVG" />
                </div>
                <div onClick={()=>{setSettingsPopupShowing(!settingsPopupShowing)}}>
                    <Settings color="white" className="SheetSVG" />
                </div>
            </div>
        )
    }

    const Publish = () => {
        return (
            <div className="Publish">
                <span>
                    <Check color="green" className="SheetSVG"/>
                </span>
            </div>
        )
    }

    return(
        <div className="SheetPage">
            {/* <input placeholder='Website title' id="input-title" /> */}
            {/* <div onClick={magic()}>Start new website</div> */}
            { shareableLink &&
                <div>
                    <EditBtn />
                    <TemplateSwapper 
                        showing={templateShowing} 
                        setShowing={setTemplateShowing} 
                        template={template} 
                        setTemplate={setTemplate} 
                    />
                </div>
            }
            { shareableLink && <Publish /> }

            {/* <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSBGMn0tCspTTTNjYdLIOtkbh1jG3HBVS66m0kVe8sxSjnyjQGNJpj4OtpOloGofV98mCnHWFNSMQx2/pubhtml?gid=193262248&amp;single=true&amp;widget=true&amp;headers=false&amp;range=A15:A16"></iframe> */}
            {/* <iframe src="https://docs.google.com/spreadsheets/d/1YGIyDLS66GQv-0CKvmli079MahSutcIqWQl2eYqL_58/pubhtml?widget=true&headers=false&embedded=true"></iframe> */}
            
            <div>
                <div className="Template-wrapper">
                    <TemplateRenderer 
                        template={template} 
                        sheetData={sheetData} 
                        pageName={pageName}
                        websiteContent={websiteContent}
                    />
                </div>
            </div>

            <SettingsPopup showing={settingsPopupShowing} setShowing={setSettingsPopupShowing} shortId={shortId} currentSettings={websiteContent} />

            <Loading loading={loading} />
        </div>  
    )
}


const loadConfigurationFromDB = async (shortId) => {
    if(!global.db) return;
    return global.db.collection('UserConfigurations')
        .doc(shortId)
        .get()
        .then((doc)=>{
            console.log('Success loading configuration from DB: ', doc.data())
            return doc.data();
        }).catch(err => {console.error("Error loading configuration from DB: ", err)});
}

const loadCurrentWebsiteContentFromDB = async (shortId, cb) => {
    if(!global.db) return;
    return global.db.collection('WebsiteContent')
        .doc(shortId)
        .onSnapshot(doc => {
            console.log('Success loading website content from DB');
            cb(doc.data());
        })
        //.catch(err => console.error("Error loading Website Content from DB"))
}