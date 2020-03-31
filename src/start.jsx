import React from 'react';

export default class Start extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            texts: [
                'F','I','N','D',' ','T','H','E',' ','O','D','D',' ','O','N','E',' ','0','U','T',
            ]
        }
    }

    render(){
        return(
            <div className="start-container">
                <h1>
                    {
                        this.state.texts.map((t, i) => (
                            <span key={i} onClick={()=>{
                                if(i === this.state.texts.length-3){
                                    this.props.f_nextLevel();
                                } else {
                                    this.props.f_wrong();
                                }
                            }}>{t}</span>
                        ))
                    }
                </h1>
                <p onClick={()=>{this.props.f_wrong();}}>Click on it when you have found it</p>
                {/* <span className="subheader">It hurts when you are wrong</span>
                <br/>
                <span className="subheader">Try and get the lowest score</span> */}
            </div>
        );
    }
}