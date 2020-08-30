import React, {useRef} from 'react';
import Editable from '../components/Editable';

export default function EditableHeader({

}){
    const componentRef = useRef();
    const component = <div ref={componentRef}><span className="inner">Header</span></div>;
    return (
        <Editable component={component} name='header' componentRef={componentRef} />
    )
}
