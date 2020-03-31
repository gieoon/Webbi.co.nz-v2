import React from 'react';
import '../../Shape/shape.css';
console.log(window.innerWidth);
const SIZE = window.innerWidth / 3 + "px"
const RED = "rgb(245, 93, 66)";
const GREEN = "rgb(129, 222, 137)";
const BLUE = "rgb(115, 121, 237)";
const YELLOW = "rgb(232, 224, 77)";

export default class Square extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            color: `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`,
            width: SIZE,
            left: props.left,
            b_odd: props.b_odd,
            colorSequence: [RED,GREEN,BLUE,YELLOW],
            colorSequenceOdd: [RED,BLUE,GREEN,YELLOW],
            currentIndex: props.index
        }
    }

    componentDidMount(){

        setInterval(()=>{
            var i = this.state.currentIndex;
            i++;
            if(i === 4) i = 0;
            this.setState({
                currentIndex: i
            });
        }, 2500);
    }

    render(){
        return(
            <div 
                onClick={()=>{
                    if(this.state.b_odd)
                        this.props.f_nextLevel();
                }}
                className="shape-square" 
                style={{
                    backgroundColor: `${this.state.b_odd ? this.state.colorSequenceOdd[this.state.currentIndex] : this.state.colorSequence[this.state.currentIndex]}`,
                    width: `${this.state.width}`,
                    height: `${100}%`,
                    opacity: ".75",
                    //top: "30%",
                    left: `calc(${this.state.left})`,
                    //animationDelay: `${getRandomInt(2000) + 'ms'}`,
                    //animationDuration: "5000ms",
                    //animationName: `${this.state.b_odd ? "switchOdd" : "switch"}`
                }}
            >
            </div>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
