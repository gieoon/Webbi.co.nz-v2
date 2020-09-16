import React, {useState, useEffect} from 'react';
import {X} from 'react-feather';

export default function TemplateSwapper({
    template, 
    setTemplate,
    showing,
    setShowing,
}){
    const [templates, setTemplates] = useState([]);
    
    useEffect(()=>{
        global.db
            .collection('Constants')
            .doc('Templates')
            .get()
            .then(doc => {
                console.log(doc.get('templates'))
                setTemplates(doc.get('templates'));
                // return doc.get('templates');
            });
    }, []);

    return (
        <div>
            <div className={"TemplateOverlay " + (showing ? "show" : "")} 
                onClick={()=>{setShowing(false)}}
            >
            </div>
            <div className={"TemplateSwapper " + (showing ? "show" : "")}>
                <div className="title-wrapper">
                    <h2 onClick={()=>setShowing(true)}>
                        Select your website category
                    </h2>
                    <X onClick={()=>{setShowing(false)}} size={"2rem"} />
                </div>
                <div className="contents">
                {
                    Object.values(templates).map((v, index)=>(
                        <div key={"template-" + index}>
                            <TemplateItem template={v} setTemplate={setTemplate} currentTemplate={template} />
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

const TemplateItem = ({
    template,
    setTemplate,
    currentTemplate,
}) => {
    console.log(template.name);
    return(
        <div onClick={()=>{
            template.callback();
            setTemplate(template.name);
        }} className={"TemplateItem " + (currentTemplate === template.name ? 'selected' : '')}>
            <span className="title">{template.name}</span>
            <span className="description">{template.description}</span>
        </div>
    )
}