import React from 'react';
import './level.css';

const SIZE = "64px" // 10 // 20
export default class Square extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // Change these values to turn into hues
            animationNo: getRandomInt(4),
            color: 'white',
            opacity: `${Math.random()}`,
            width: SIZE,
            height: SIZE,
            left: props.left,
            polarity_x: getRandomInt(2) === 1 ? -1 : 1,
            polarity_y: getRandomInt(2) === 1 ? -1 : 1,
            b_odd: props.b_odd,
            oddColor: props.oddColor
        }
    }

    render(){
        return(
            // <div style={{width:"16px",height:"16px",position:"absolute"}}>
                <div 
                    onClick={()=>{
                        console.log('clicked: ', this.state.b_odd);
                        if(this.state.b_odd)
                            this.props.f_nextLevel();
                    }}
                    className="shape-3" 
                    style={{
                        backgroundColor: `${'white'}`,
                        // width: `${this.state.width}`,
                        // height: `${this.state.height}`,
                        marginTop: "-" + getRandomInt(10) + 4 + "vh",
                        left: `${this.state.left}`,
                        opacity: 1,
                        width: this.state.b_odd ? "14px" : "8px",
                        height: this.state.b_odd ? "14px" : "8px",
                        pointerEvents: this.state.b_odd ? "all" : "none",
                        animationDelay: this.state.b_odd ? 15000 : getRandomInt(10000) + 'ms',
                        animationDuration: getRandomInt(10000) + 15000 + (this.state.b_odd ? 5000 : 0) + 'ms',
                        animationName: "snowing" + this.state.animationNo,
                        //animationDirection: this.state.b_odd ? "reverse" : "normal"

                    }}
                >
                </div>
            // </div>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //width: "32px",
  //height: "32px",