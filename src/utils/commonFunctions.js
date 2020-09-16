import {API_ENDPOINT} from '../constants';

/*
export const ingestSpreadsheetData = (sheets) => {
    const output = {};
    for(var sheet of sheets){
        console.log(sheet);
        var sheetValues = sheet[0].values;
        if(sheet.range.includes('Content')){
            output['Content'] = handleContentSheet(sheetValues)
        } 
        else if(sheet.range.includes('Settings')){
            output['Settings'] = handleSettingsSheet(sheetValues)
        }
    }
    return output;
}
*/


// Drive URL's need to be updated to an alternate address to work.
// In the future, this needs to cater to 'Insert in Cell' data.
export const convertDriveURL = (imgUrl) => {
    // Update Drive URL to a separate one on display
    if(imgUrl.includes('https://drive.google.com/file/d/')){
        // Extract fileId from URL
        const regex = /(?<=d\/)(.*)(?=\/view)/;
        var fileIds = imgUrl.match(regex);
        if(!fileIds.length) return imgUrl;
        var fileId = fileIds[0];
        var newUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
        return newUrl;
    }
    return imgUrl;
}

// After using different Sheets API, data comes back differently, but includes grid information, to get the colors we need.
export const ingestSpreadsheetData = (sheets) => {
    // const output = {Content: {}, Settings: {}};
    const output = [];
    for(var sheet of sheets){
        var sheetName = sheet.sheetName;
        var rowValues = sheet.rowData;
        for(var cells of rowValues){
            if(!cells.values) continue;
                
            if(sheetName === 'Content'){
                // Pass by reference
                handleContentSheet(output,cells.values);
            } else if(sheetName === 'Settings'){
                handleSettingsSheet(output, cells.values);
            }
        }
    }
    return output;
}

// const CONTENT_SHEET_HEADERS = [
//     'Page Element',
//     'Content',
//     'Background Color',
//     'Text Color',
//     'Font Size'
// ]

const extractContentOfCell = (values) => {
    console.log(values);
    if(!values || !Object.keys(values).length) return "";
    // return values.userEnteredValue.stringValue 
    // || values.userEnteredValue.numberValue 
    // || values.formattedValue;
    return values.formattedValue
    || values?.userEnteredValue?.stringValue 
    || values?.userEnteredValue?.numberValue
    || "";
}

const handleContentSheet = (output, sheetValues) => {
    // const id = sheetValues[0]?.userEnteredValue?.stringValue;
    // const content = (sheetValues[1]?.userEnteredValue?.stringValue || sheetValues[1]?.userEnteredValue?.numberValue);
    // const backgroundColor = convertColorFromObj(sheetValues[2]?.userEnteredFormat?.backgroundColor || sheetValues[2]?.userEnteredFormat?.backgroundColorStyle);
    // const color = convertColorFromObj(sheetValues[3]?.userEnteredFormat?.backgroundColor || sheetValues[3]?.userEnteredFormat?.backgroundColorStyle);
    // // const fontSize = sheetValues[4].textFormat.fontSize || 'initial';
    // const fontSize = (sheetValues[4]?.userEnteredValue?.numberValue || sheetValues[4]?.userEnteredValue?.stringValue || 'initial');
    // const borderRadius = (sheetValues[5]?.userEnteredValue?.stringValue || sheetValues[5]?.userEnteredValue?.numberValue) || 0;
    // const style = {
    //     color, backgroundColor, fontSize, borderRadius,
    // };
    // console.log(style);
    // console.log(id, CONTENT_KEY_2_UI[id]);
    var name, imgUrl, text, date, price;
    if(!sheetValues.length) return output;
    name = extractContentOfCell(sheetValues[0]);
    imgUrl = extractContentOfCell(sheetValues[1]);
    text = extractContentOfCell(sheetValues[2]);
    date = extractContentOfCell(sheetValues[3]);
    price = extractContentOfCell(sheetValues[4]);
    
    output.push({
        name,
        imgUrl,
        text,
        date,
        price
    });

    // output['Content'][CONTENT_KEY_2_UI[id]] = {
    //     content: content,
    //     style: style
    // }

    return output;
}


const handleSettingsSheet = (output, sheetValues) => {
    // console.log(sheetValues)
    // Remove the preview setting
    if(sheetValues.length < 2) 
        return output;
        
    const id = sheetValues[0]?.userEnteredValue?.stringValue;
    var content = (sheetValues[1]?.userEnteredValue?.stringValue || sheetValues[1]?.userEnteredValue?.numberValue) || "";
    // console.log(id, content);
    if(id  === 'Template'){
        content = TEMPLATE_2_UI[content];
    }
    output['Settings'][id] = content;

    return output;
}

/*
// Create a style object to insert into the element.
const handleCSS = (format) => {
    const output = {};
    output['color'] = convertColorFromObj(format.textFormat.foregroundColor || format.textFormat.foregroundColorStyle);
    output['backgroundColor'] = convertColorFromObj(format.backgroundColor || format.backgroundColorStyle);
    output['fontSize'] = format.textFormat.fontSize || 'initial';
    return output;
    // output[JS_CSS_2_UI[k]] = format[k]
}
*/
/*
const JS_CSS_2_UI = (val) => {
    switch(val){
        case 'foregroundColor': return 'color';
        case 'foregroundColorStyle': return 'color';
        default: return val;
    }
}
*/
const convertColorFromObj = (colorObj) => {
    if(!colorObj) return "";
    return `rgba(${scale(colorObj.red)},${scale(colorObj.green)},${scale(colorObj.blue)},1)`;
}

// Convert from 0 to 1 scale into 0 - 255 scale.
const scale = (val) => {
    return Math.round(val * 255.0);
}


// Convert Template keys to visible UI elements
export const TEMPLATE_2_UI  = {
    Basic: 'BASIC',
    Portfolio: 'PORTFOLIO',
    "Job Listing Website": "JOB_LISTING",
    "News Website": 'NEWS_WEBSITE',
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
/*
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
*/
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

export const getStyles = async (name) => {
    return fetch(`${API_ENDPOINT}/styles?component=${name}`,{
        method: 'GET',
        // mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
    .then((response) => {
        return response.json()
    })
    .then((d)=> {
        console.log(d);
        return d;
    });
}

/*
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
*/
