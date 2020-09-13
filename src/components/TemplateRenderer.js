import React from 'react';
import Basic from './Templates/Basic';
import Event from './Templates/Event';
import JobListing from './Templates/JobListing';

export default function TemplateRenderer({
    template,
    sheetData
}){
    const getTemplate = () => {
        console.log('Getting template: ', sheetData, template)
        switch(template){
            case 'BASIC': return <Basic data={sheetData} />
            case 'JOB_LISTING': return <JobListing data={sheetData} />
            case 'NEWS_WEBSITE': return <Event data={sheetData} />
            default: return <></>
        }
    }
    // console.log("sheetData: ", sheetData);
    return (
        <div>
            {
                getTemplate()
            }
        </div>
    )
}
