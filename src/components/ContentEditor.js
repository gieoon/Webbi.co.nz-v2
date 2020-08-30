import React from 'react';

export default function ContentEditor({
    content,
    setContent,
}){
    const handleChange = (e) => {
        console.log(e)
        setContent(e.target.value)
    }
    return(
        <div>
            <input placeholder={content} onChange={(e)=>{handleChange(e)}} />
        </div>
    )
}
