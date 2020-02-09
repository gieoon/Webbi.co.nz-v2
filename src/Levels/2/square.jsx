import React from 'react';
import '../../Shape/shape.css';

const SIZE = "32px" // 10 // 20
export default class Square extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // Change these values to turn into hues
            color: `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`,
            //color: 'white',
            opacity: `${Math.random()}`,
            width: SIZE,
            height: SIZE,
            left: props.left,
            top: props.top,
            x: Number(props.left.replace(/[a-zA-Z]/g,'')),
            y: Number(props.top.replace(/[a-zA-Z]/g,'')),
            v_x: Math.random() / 2.0,
            v_y: Math.random() / 2.0,
            polarity_x: getRandomInt(2) === 1 ? -1 : 1,
            polarity_y: getRandomInt(2) === 1 ? -1 : 1,
            b_odd: props.b_odd,
            oddColor: props.oddColor
        }
    }

    render(){
        return(
            <div 
                onClick={()=>{
                    if(this.state.b_odd)
                        this.props.f_nextLevel();
                    else 
                        this.props.f_wrong();
                }}
                className="shape-square" 
                style={{
                    backgroundColor: `${this.state.b_odd ? this.state.oddColor : this.state.color}`,
                    width: `${this.state.width}`,
                    height: `${this.state.height}`,
                    top: `${this.state.top}`,
                    left: `${this.state.left}`,
                    opacity: `${this.state.b_odd ? 1 : this.state.opacity}`,
                    animationDelay: `${getRandomInt(5000) + 'ms'}`,
                    animationDuration: `${!this.state.b_odd ? getRandomInt(20000) + 1000 + 'ms' : ""}`,
                    animationName: `${!this.state.b_odd ? "fadeout" : ""}`
                }}
            >
            </div>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //width: "32px",
  //height: "32px",