import React, {useState} from 'react';
import EditableContentItem from '../editables/EditableContentItem';
import StyleSwitcher from './StyleSwitcher';

export default function ContentList({
    contents
}){
    // From SCSS file
    const NUMBER_OF_STYLES = 3;
    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

    return(
        <div>
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
    )
}
