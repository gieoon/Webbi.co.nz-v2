import React from 'react';

export default function LandingPage({

}){
    const magic = () => {
        console.log('duh duh duh magic!');
    }
    
    return (
        <div>
            Landing Page

            <div onClick={()=>{magic()}}>Click here for magic</div>
        </div>
    )
}
