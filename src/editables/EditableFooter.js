import React, {useRef} from 'react';
import Editable from '../components/Editable';
import {Mail, Phone, Twitter, Facebook, Linkedin, Instagram} from 'react-feather';
import webbi from '../assets/icon.png';

export default function EditableFooter({

}){
    
    const componentRef = useRef();
    const component = <div ref={componentRef}>
        <div>  
            <Mail />
            <Phone />
            <Twitter />
            <Facebook />
            <Linkedin />
            <Instagram />
        </div>
        <span className="inner"></span>
    </div>

    return (
        <Editable component={component} name="footer" componentRef={componentRef} />
    )
}
