import React from 'react';
import { withRouter } from 'react-router-dom';

function SheetPage({
    props
}){
    console.log("props: ", props);
    return(
        <div>
            Sheet Page
            <br/>
            {/* pageId: {props.match.params.pageId} */}
        </div>
    )
}

export default withRouter(SheetPage);
