import React, { useEffect } from 'react';

export default function Basic({
    data
}){
    console.log('Basic template: ', data);

    useEffect(()=>{
        document.title = get('C_PAGE_TITLE');
    });

    const get = (key) => {
        return data.Content[key];
    }
    return(
        <div className="Basic">
            <span>Basic template</span>
            <h2>{get('C_TOP_HEADER')}</h2>
            {/* <title>{get('C_PAGE_TITLE')}</title> */}
            <div >
                <div id="C_FOOTER">
                    <div id="C_EMAIL">
                        <a href={`mailto:${get('C_EMAIL')}`}>
                            {get('C_EMAIL')}
                        </a>
                    </div>
                    <div id="C_MOBILE_NUMBER">
                        <span>{get('C_MOBILE_NUMBER')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}