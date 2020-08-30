import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getStyles} from '../utils/commonFunctions';
import StyleSwitcher from './StyleSwitcher';
import ContentEditor from './ContentEditor';

export default function Editable ({
    component,
    name,
    componentRef
}){
    const {shortId} = useParams();

    const [styles, setStyles] = useState([]);
    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
    const [content, setContent] = useState(name);

    useEffect(()=>{
        getStyles(name).then((s)=>{
            setStyles(s);
            if(componentRef && componentRef.current){
                for(var k of Object.keys(s[currentStyleIndex])){
                    componentRef.current.style[k] = s[currentStyleIndex][k];
                }
            }
            saveConfiguration2DB(shortId, name, s[currentStyleIndex], content);
        });
    }, []);

    useEffect(()=>{
        console.log(styles, currentStyleIndex)
        if(!styles.length) return;
        for(var k of Object.keys(styles[currentStyleIndex])){
            componentRef.current.style[k] = styles[currentStyleIndex][k];
        }
        saveConfiguration2DB(shortId, name, styles[currentStyleIndex], content);
    }, [currentStyleIndex]);

    useEffect(()=>{
        componentRef.current.querySelector('.inner').textContent = content;
    }, [content]);

    return(
        <div className="Editable">
            {component}
            <ContentEditor content={content} setContent={setContent} />
            <StyleSwitcher 
                currentStyleIndex={currentStyleIndex}
                setCurrentStyleIndex={setCurrentStyleIndex}
                numberOfStyles={styles.length} 
            />
        </div>
    );
}

// Save style selection and inner text to DB
const saveConfiguration2DB = (shortId, elementName, styles, content) => {
    if(!global.db) return;
    global.db.collection('UserConfigurations')
        .doc(shortId)
        .set({
            [`${elementName}`]: {
                styles: styles,
                content: content,
            }
        }, {merge: true})
        .then(()=>{
            console.log('Success saving configuration to DB')
        }).catch(err => {console.error("Error saving configuration to DB: ", err)});
}