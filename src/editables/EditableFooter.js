import React, {useRef} from 'react';
import Editable from '../components/Editable';

// import webbi from '../assets/logo_254.png';

export default function EditableFooter({

}){
    
    const componentRef = useRef();
    const component = <div ref={componentRef}>
        <span className="inner"></span>
        <div><span>
            This website was built with <a href="https://www.webbi.xyz" target="_blank" rel="noopener noreferrer">Webbi </a>
            {/* <img src={webbi} alt="" /> */}
             {/* in two minutes. */}
        </span>
        </div>
    </div>

    return (
        <Editable component={component} name="footer" componentRef={componentRef} />
    )
}
