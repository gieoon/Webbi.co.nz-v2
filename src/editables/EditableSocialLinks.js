/*
    Adding or removing social links from bottom footer, 
    They can also be displayed at different locations around the page
*/

import React, {useRef} from 'react';
import Editable from '../components/Editable';
import {Mail, Phone, Twitter, Facebook, Linkedin, Instagram} from 'react-feather';

export default function EditableSocialLinks({

}){
    const componentRef = useRef();

    return(
        <div>  
            <Mail />
            <Phone />
            <Twitter />
            <Facebook />
            <Linkedin />
            <Instagram />
        </div>
    )
}
