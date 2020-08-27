import React, { useEffect } from 'react';
import './Basic.scss';

export default function Basic({
    data
}){
    console.log('Basic template: ', data);

    useEffect(()=>{
        document.title = get('C_PAGE_TITLE');
    });

    const get = (key) => {
        return data.Content[key]?.content;
    }
    const getStyle = (key) => {
        return data.Content[key]?.style;
    }

    return(
        <div className="Basic">
            <span>Basic template</span>
            <h2 style={getStyle('C_TOP_HEADER')}>{get('C_TOP_HEADER')}</h2>
            {/* <title>{get('C_PAGE_TITLE')}</title> */}
            <div>
                <p id="C_SECTION_1" style={getStyle('C_SECTION_1')}>{get('C_SECTION_1')}</p>
            </div>
            <div>
                <p id="C_SECTION_2" style={getStyle('C_SECTION_2')}>{get('C_SECTION_2')}</p>
            </div>
            <div>
                <p id="C_SECTION_3" style={getStyle('C_SECTION_3')}>{get('C_SECTION_3')}</p>
            </div>
            <div >
                <div id="C_FOOTER" style={getStyle('C_FOOTER')}>
                    <div id="C_EMAIL" style={getStyle('C_EMAIL')}>
                        <a href={`mailto:${get('C_EMAIL')}`}>
                            {get('C_EMAIL')}
                        </a>
                    </div>
                    <div id="C_MOBILE_NUMBER" style={getStyle('C_MOBILE_NUMBER')}>
                        <span>{get('C_MOBILE_NUMBER')}</span>
                    </div>
                    <div id="C_FACEBOOK" style={getStyle('C_FACEBOOK')}>
                        <span>{get('C_FACEBOOK')}</span>
                    </div>
                    <div id="C_LINKEDIN" style={getStyle('C_LINKEDIN')}>
                        <span>{get('C_LINKEDIN')}</span>
                    </div>
                    <div id="C_INSTAGRAM" style={getStyle('C_INSTAGRAM')}>
                        <span>{get('C_INSTAGRAM')}</span>
                    </div>
                    <div id="C_TWITTER" style={getStyle('C_TWITTER')}>
                        <span>{get('C_TWITTER')}</span>
                    </div>
                </div>
                <div id="footer">
                    <span>{get('C_FOOTER')}</span>
                </div>
            </div>
        </div>
    )
}