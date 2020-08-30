import React, {useState} from 'react';
import {Link} from 'react-router-dom';
// import uuid from 'react-uuid'
// const shortid = require('shortid');
import shortid from 'shortid';

const DEFAULT_PROJECT_NAME = "My New Website";

export default function LandingPage({

}){

    const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);
    const magic = () => {
        console.log('duh duh duh magic!');
    }
    
    const newUuid = shortid.generate(); //uuid();
    console.log("newUuid: ", newUuid);
    
    const onProjectNameChange = () => {
        console.log('Getting project name')
        setProjectName(document.getElementById('_projectName').value || DEFAULT_PROJECT_NAME);
    }

    return (
        <div>
            Landing Page

            <input type="text" id="_projectName" placeholder="What to call your project" onChange={onProjectNameChange}/>
            <Link to={'/page/' + newUuid + '/' + projectName} >
                <div 
                    //onClick={()=>{magic()}}
                >Create your website in 3 minutes</div>
                    
            </Link>
            <p>Friendly website creation</p>
        </div>
    )
}
