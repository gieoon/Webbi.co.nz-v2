import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage({

}){
    const magic = () => {
        console.log('duh duh duh magic!');
    }
    
    const newPageId = 12345;
    return (
        <div>
            Landing Page

            <Link to={'/pages/' + newPageId} >
                <div onClick={()=>{magic()}}>Create your website in 3 minutes</div>
            </Link>
        </div>
    )
}
