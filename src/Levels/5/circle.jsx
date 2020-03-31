import React from 'react';
import '../../Shape/shape.css';

const SIZE = "20px" // 10 // 20
const MVMT = 100;
export default class Circle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // Change these values to turn into hues
            //color: `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`,
            color: 'white',
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

        this.circleRef = React.createRef();
    }

    componentDidMount(){
        //this.move();
        //console.log(this.state);
    }

    move = () => {
        setInterval(()=>{
            this.setState({
                x : Number(this.state.left.replace(/[a-zA-Z]/g,'')) * this.state.polarity_x,
                y: Number(this.state.top.replace(/[a-zA-Z]/g,'')) * this.state.polarity_y,
                left: this.state.x + this.state.v_x + 'vw',
                top: this.state.y + this.state.v_y + 'vh'
            })
            console.log('updated');
            if(Number(this.state.left.replace(/[a-z]/g,'')) < 0)
                this.setState({polarity_x: this.state.polarity_x * 1 });
            if(Number(this.state.top.replace(/[a-z]/g,'')) < 0)
                this.state.polarity_y *= 1;
            if(Number(this.state.left.replace(/[a-z]/g,'')) > window.innerWidth)
                this.state.polarity_x *= 1; 
            if(Number(this.state.top.replace(/[a-z]/g,'')) > window.innerHeight)
                this.state.polarity_y *= 1; 
        }, MVMT);
    }

    render(){
        return(
            <div 
                ref={this.circleRef}
                onClick={()=>{
                    if(this.state.b_odd)
                        this.props.f_nextLevel();
                    // else 
                    //     this.props.f_wrong();
                }}
                className="shape-circle" style={{
                backgroundColor: `${this.state.b_odd ? this.state.oddColor : this.state.color}`,
                width: `${this.state.width}`,
                height: `${this.state.height}`,
                top: `${this.state.top}`,
                left: `${this.state.left}`,
                opacity: `${this.state.b_odd ? 1 : this.state.opacity}`,
                animationDelay: `${getRandomInt(999) + 'ms'}`,
                animationDuration: `${!this.state.b_odd ? getRandomInt(5000) + 1000 + 'ms' : ""}`,
                //animationName: `wobble${getRandomInt(5)}`
            }}>
                
            </div>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //width: "32px",
  //height: "32px",