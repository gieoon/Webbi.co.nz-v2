import React from 'react';
import Square from './square.jsx';
import './level.css';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

//36 * 18
const COLUMNS = 40; 
const ROWS = 25;
export default class Level2 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            circles: [],
            yy: [],
            odd_x: 5,
            odd_y: 2
        }
    }

    componentDidMount(){
        const c = [], yy = [];
        for(var i=0;i<ROWS;i++){
            c.push(i);
        }
        for(var y=0;y<COLUMNS;y++){
            yy.push(y)
        }
        this.setState({
            circles: c,
            yy: yy
        }, ()=>{
            this.forceUpdate();
        })

        setInterval(()=>{
            var el = document.getElementById('textarea');
            el.innerHTML = el.innerHTML + "1";
        },10);

        // this.loop1();
        // setInterval(()=>{
        //     this.loop1();
        // }, 25 * 1000)

        // setInterval(()=>{
        //     for(var i=0;i<ROWS*COLUMNS-1;i++){
        //         setTimeout(()=>{
        //             this.loop();
        //         }, 100000 / (ROWS*COLUMNS) + i);
        //     }
        // }, 100000);
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    loop1 = async () => {
        for(var i=0;i<ROWS*COLUMNS-1;i++){
                await this.sleep(25);
                //console.log('updating: ', i);
                var el = document.getElementById('circle-' + i);
                var n = Number(el.innerHTML) + 1;
                if(n === 2) n = 0;
                el.innerHTML = n;
            //}, 100000 / (ROWS*COLUMNS) + i);
        }
    }


    render(){
        //console.log('this.state: ', this.state.circles);
        var count = 0;
        return(
            <textarea 
            id="textarea"
            style={{
                width:"100%",
                height: "100vh",
                color: "white",
                letterSpacing: "22px",
                fontSize: "22px",
                lineHeight: "1.5",
                backgroundColor: "black",
            }}>
                {
                    Array.from(50).map((i,index) =>(
                        <span key={index}>i</span>
                    ))
                }
            </textarea>
            // <div>
            //     {this.state.circles.map((circle, index) => (
            //         this.state.yy.map((y, index2) => (
            //             <div key={"circle-xx-"+index+"-yy-"+index2}>
            //                     <Square 
            //                         id={"circle-" + count}
            //                         index={count++}
            //                         f_nextLevel={this.props.f_nextLevel}
            //                         f_wrong={this.props.f_wrong}
            //                         b_odd={index === this.state.odd_y && index2 === this.state.odd_x}
            //                         top={index * (100 / ROWS) + 'vh'} 
            //                         left={index2 * (100 / COLUMNS) + 'vw'} />
            //             </div>
            //         ))
            //     ))}
            // </div>
        );
    }
}
