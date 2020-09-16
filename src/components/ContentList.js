import React, {useState} from 'react';
import EditableContentItem from '../editables/EditableContentItem';
import StyleSwitcher from './StyleSwitcher';
import logo from '../assets/logo_254_white.png';

export default function ContentList({
    contents
}){
    // From SCSS file
    const NUMBER_OF_STYLES = 3;
    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

    console.log("contents: ", contents);
    return(
        <>
        { contents.length
            ? <div>
                <div className="EditableContentItemParent">
                {
                    contents.map((content, index) => (
                        <EditableContentItem 
                            key={"editablecontent-" + index} 
                            content={content} 
                            currentStyleIndex={currentStyleIndex}
                        />
                    ))
                }
                </div>
                <StyleSwitcher 
                    currentStyleIndex={currentStyleIndex}
                    setCurrentStyleIndex={setCurrentStyleIndex}
                    numberOfStyles={NUMBER_OF_STYLES} 
                />
            </div>
            : <div className="ContentList-empty-wrapper" onClick={()=>{document.getElementById('spreadsheetLink').click()}}>
                <img src={logo} alt="" height="50px" style={{marginBottom:"1rem"}}/>
                <h2>Add rows to this spreadsheet to edit content</h2>
            </div>
            }
        </>
    )
}
