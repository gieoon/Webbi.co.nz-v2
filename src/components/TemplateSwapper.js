import React, {useState, useEffect} from 'react';
import {X} from 'react-feather';

export default function TemplateSwapper({
    template, 
    setTemplate
}){
    const [expanded, setExpanded] = useState(false);

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
        <div className="TemplateSwapper">
            <span onClick={()=>setExpanded(true)}>Swap template</span>
            <X onClick={()=>{setExpanded(false)}}/>
            {   expanded &&
                Object.values(templates).map((v, index)=>(
                    <div key={"template-" + index}>
                        <TemplateItem template={v} setTemplate={setTemplate} currentTemplate={template} />
                    </div>
                ))
            }
        </div>
    )
}

const TemplateItem = ({
    template,
    setTemplate,
    currentTemplate,
}) => {
    return(
        <div onClick={()=>{
            template.callback();
            setTemplate(template.name);
        }} className={"TemplateItem " + (currentTemplate === template.name ? 'selected' : '')}>
            <span>{template.name}</span>
            <br/>
            <span>{template.description}</span>
        </div>
    )
}