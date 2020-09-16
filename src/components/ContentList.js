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
            : <EmptyContentList />
            }
        </>
    )
}

const EmptyContentList = () => {
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