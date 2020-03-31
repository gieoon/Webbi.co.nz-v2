import React from 'react';

export default class Start extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        const wrongContainer = document.getElementById("wrongCount-container");
        //wrongContainer.style.display = 'block';
        //document.getElementById('finalClickCount').innerHTML = wrongContainer.innerHTML;
    }

    render(){
        return(
            <div className="start-container">
                <p>Thanks for playing</p>
                <h1>
                    {
                        `You finished in ${document.getElementById("wrongCount-container").innerHTML} clicks`.split('').map((t, i) => (
                            <span key={i} 
                            onClick={()=>{
                            }}>{t}</span>
                        ))
                    }
                </h1>
                <p onClick={()=>{this.props.f_wrong();}}>Created by <a href="https://gieoon.github.io">gieoon</a> during self-isolation.</p>
                {/* <span className="subheader">It hurts when you are wrong</span>
                //<s>a loser</s> 
                <br/>
                <span className="subheader">Try and get the lowest score</span> */}
            </div>
        );
    }
}