import React, {useState, useEffect} from 'react';
import {X} from 'react-feather';
// TODO load this from DB
/*
const templates = [
    { 
        name: 'Basic',
        callback: ()=> {},
        description: 'A basic template to serve your needs and get comfortable with Webbi.'
    },
    {
        name: 'Portfolio',
        callback: ()=> {},
        description: "Perfect for showing your product or something you've created",
    },
    {
        name: 'Job Listing Website',
        callback: ()=> {},
        description: "Show off a list of Excel documents"
    },
    {
        name: "News Website",
        callback: ()=> {},
        description: "Show a variety of articles that you have aggregated"
    },
    {
        name: 'Custom',
        callback: ()=> {alert("Custom selected")},
        description: "Talk to us and let us know what you need, our in-houe designers will make something that fits your needs."
    }
]
*/

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
                // console.log(doc.get('templates'))
                setTemplates(doc.get('templates'));
                // return doc.get('templates');
            });
    });

    return (
        <div className="TemplateSwapper">
            <span onClick={()=>setExpanded(true)}>Swap template</span>
            <X onClick={()=>{setExpanded(false)}}/>
            {   expanded &&
                templates.map((t, index)=>(
                    <div key={"template-" + index}>
                        <TemplateItem template={t} setTemplate={setTemplate} currentTemplate={template} />
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