
export const ingestSpreadsheetData = (sheets) => {
    const output = {};
    for(var sheet of sheets){
        var sheetValues = sheet.values;
        if(sheet.range.includes('Content')){
            output['Content'] = handleContentSheet(sheetValues)
        } 
        else if(sheet.range.includes('Settings')){
            output['Settings'] = handleSettingsSheet(sheetValues)
        }
    }
    return output;
}

// Convert Template keys to visible UI elements
export const TEMPLATE_2_UI  = {
    Basic: 'BASIC',
    "Job Listing Website": "JOB_LISTING",
    "News Website": 'NEWS_WEBSITE'
}

// Convert Keys to UI elements and decorate them accordingly.
export const SETTINGS_KEY_2_UI = {
    "Primary Background Color": "S_PRIMARY_BACKGROUND_COLOR",
    "Hovered Background Color": "S_HOVERED_BACKGROUND_COLOR",
    "Text Color": "S_TEXT_COLOR",
    "Section 1 Background Color": "S_SECTION_1_BACKGROUND_COLOR",
    "Section 2 Background Color": "S_SECTION_2_BACKGROUND_COLOR",
    "Section 3 Background Color": "S_SECTION_3_BACKGROUND_COLOR",
}

export const CONTENT_KEY_2_UI = {
    "Page Title": "C_PAGE_TITLE",
    "Header at Top": "C_TOP_HEADER",
    "Section 1": "C_SECTION_1",
    "Section 2": "C_SECTION_2",
    "Section 3": "C_SECTION_3",
    "Email": "C_EMAIL",
    "Phone Number": "C_PHONE_NUMBER",
    "Mobile Number": "C_MOBILE_NUMBER",
    "Facebook": "C_FACEBOOK",
    "LinkedIn": "C_LINKEDIN",
    "Instagram": "C_INSTAGRAM",
    'Twitter': "C_TWITTER",
    'Footer': "C_FOOTER",
}

const handleContentSheet = (sheetValues) => {
    const output = {};
    for(var entry of sheetValues){
        var k = entry[0];
        var v = entry[1];
        switch(k){
            default: 
                output[CONTENT_KEY_2_UI[k]] = v
        }
        var css = entry.slice(2) // Remainder are CSS values
        const styles = createCSSForElement(css);
        output['Styles'] = styles;
    }
    return output;
}

const STYLE_COLUMNS_DISPLAY_2_CODE = {
    'Background Color': 'background-color',
    'Text Color': 'color',
    'Font size': 'font-size',
}

// This should be defined in the DB
const STYLE_COLUMNS = [
    'background-color',
    'color',
    'font-size',
]

const createCSSForElement = (styles) => {
    const s = {};
    for(var i in styles){
        switch(styles[i]){
            default: s[STYLE_COLUMNS[i]] = styles[STYLE_COLUMNS_DISPLAY_2_CODE[i]];
        }
    }
    return s;
}

const handleSettingsSheet = (sheetValues) => {
    const output = {};
    for(var entry of sheetValues){
        var k = entry[0];
        var v = entry[1];
        switch(k){
            case 'Template': 
                output[k] = TEMPLATE_2_UI[v];
                break;
            default: 
                output[SETTINGS_KEY_2_UI[k]] = v
        }
    }
    return output;
}

