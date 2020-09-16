import React from 'react';
import LandingPage from './Templates/LandingPage';
import Creative from './Templates/Creative';
// import Event from './Templates/Event';
// import JobListing from './Templates/JobListing';

export default function TemplateRenderer({
    template,
    sheetData,
    pageName,
    websiteContent,
}){
    const getTemplate = () => {
        console.log('Getting template: ', sheetData, template)
        switch(template){
            case 'CREATIVE': return <Creative sheetData={sheetData} pageName={pageName} websiteContent={websiteContent} />
            case 'LANDING_PAGE': return <LandingPage sheetData={sheetData} pageName={pageName} websiteContent={websiteContent} />
            // case 'JOB_LISTING': return <JobListing data={sheetData} />
            // case 'NEWS_WEBSITE': return <Event data={sheetData} />
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
