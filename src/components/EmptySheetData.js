import React from 'react';
import logo from '../assets/logo_254_white.png';

export default function EmptySheetData(){
    return(
        <div className="ContentList-empty-wrapper" onClick={()=>{document.getElementById('spreadsheetLink').click()}}>
            <img src={logo} alt="" height="50px" style={{marginBottom:"1rem"}}/>
            <h2>Click here to add content</h2>
            <p>Your website's content comes from your own unique spreadsheet. <br/>This means you can:</p>
            <ul>
                <li>Update/remove content with ease</li>
                <li>Easily control what is displayed</li>
            </ul>

        </div>
    )
}