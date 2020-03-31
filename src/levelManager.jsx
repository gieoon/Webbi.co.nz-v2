import React from 'react';
import Start from './start.jsx';
import Level1 from './Levels/1/level.jsx';
import Level2 from './Levels/2/level.jsx';
import Level3 from './Levels/3/level.jsx';
import Level4 from './Levels/4/level.jsx';
import Level5 from './Levels/5/level.jsx';
import Level6 from './Levels/6/level.jsx';
import Level7 from './Levels/7/level.jsx';


import LevelFinal from './Levels/final/final.jsx';

const FINAL_LEVEL = 8;
export default class LevelManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentLevel: 1, //0
            wrongCount: 0,
            b_wrongCountVisible: false,
            c_x: 1,
            c_y: 1,
            c_timer: {},
            crossrule: {}
        }
    }

    componentDidMount(){
        document.getElementsByClassName('App')[0].onclick = () => {
            this.f_wrong();
        }
    }

    getLevel(){
       switch(this.state.currentLevel){
            case 1: 
                return <Level1 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 2: 
                return <Level2 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 3: 
                return <Level3 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 4: 
                return <Level4 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 5: 
                return <Level5 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 6: 
                return <Level6 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case 7: 
                return <Level7 f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
            case FINAL_LEVEL:
                return <LevelFinal f_nextLevel={this.f_nextLevel} wrongCount={this.state.wrongCount} />
            default: 
                return <Start f_nextLevel={this.f_nextLevel} f_wrong={this.f_wrong} />
       } 
    }

    f_nextLevel = () => {
        this.setState({
            currentLevel: this.state.currentLevel + 1
        })
    }

    f_wrong = () => {
        //console.log('wrong clicked');
        // Using state refreshes everything, so don't use it
        const w = document.getElementById("wrongCount-container");
        w.innerHTML = Number(w.innerHTML) + 1;
        // This makes the state reset BAD
        // this.setState({
        //     wrongCount: w.innerHTML
        // })
        if(this.state.currentLevel < FINAL_LEVEL)
            w.style.display = 'block';
        if(global.wTimer){
            clearTimeout(global.wTimer);
        }
        global.wTimer = setTimeout(()=>{
            w.style.display = 'none';
        }, 5000);
        // this.setState({
        //     wrongCount: this.state.wrongCount + 1,
        //     b_wrongCountVisible: true
        // }, ()=>{
        //     if(this.state.wrongCountTimer !== undefined){
        //         clearTimeout(this.state.wrongCountTimer);
        //     }
        //     this.setState({
        //         wrongCountTimer: setTimeout(()=>{
        //             this.setState({
        //                 b_wrongCountVisible: false
        //             })
        //         }, 5000)
        //     });
        // })
    }

    render(){
        return(
            <div 
            // onClick={()=>{
            //     this.f_wrong();
            // }} 
            //style={{height:"100%"}}
            >
                <WrongCount 
                    count={this.state.wrongCount} 
                    b_wrongCountVisible={this.state.b_wrongCountVisible}
                    f_wrong={this.f_wrong}/>
                {
                    this.getLevel()
                }
            </div>
        )
    }
}

function WrongCount(props){
    return <div id="wrongCount-container">
        {
            props.b_wrongCountVisible && props.count
        }
    </div>
}

//TODO hide mouse functionality cuases performance issues
/*componentDidMount(){
        // http://www.javascriptkit.com/dhtmltutors/externalcss3.shtml
        this.setState({
            crossrule: document.styleSheets[0].cssRules 
                ? document.styleSheets[0].cssRules 
                : document.styleSheets[0].rules
        });

        // If cursor has not moved in 3 seconds, hide it.
        // As soon as cursor moves, show it
        //TODO PERFORMANCE ISSUES (THATS WHY NEED TO USE CANVAS)
        if(window.Event)
            document.captureEvents(Event.MOUSEMOVE);   
        document.onmousemove = (e)=>{
            const m = this.getCursorXY(e);
            if(document.getElementsByClassName('App')[0].classList.contains('nocursor'))
                document.getElementsByClassName('App')[0].classList.remove('nocursor');
            //console.log(m);
            this.setState({
                c_x: m.x,
                c_y: m.y,
                c_movedInLast3Seconds: true
            }, () => {
                const component = this;
                clearTimeout(this.state.c_timer);
                const t = window.setTimeout(()=>{
                    //console.log('timed out: ', document.styleSheets[0]);
                    component.setState({
                        c_movedInLast3Seconds: false
                    });
                    document.getElementsByClassName('App')[0].classList.add('nocursor');
                    // var stylesheet = document.styleSheets[0];
                    // var rules = stylesheet.cssRules? stylesheet.cssRules: stylesheet.rules;
                    // for(var i=0;i<rules.length;i++){
                    //     if(rules[i].selectorText === "*"){
                    //         console.log('found rule: ', rules[i]);
                    //         rules[i].style.cursor = 'none';
                    //     }
                    // }
                }, 3000);
                this.setState({
                    c_timer: t
                })
            });
            //console.log(document.styleSheets);
        };
    
    
        // setInterval(()=>{
        //     const m = this.getCursorXY();
        //     if(this.state.c_intervalCount >= 3 && this.state.c_x === m.x && this.state.c_y === m.y){
        //         // Hide cursor
        //     }
        //     this.setState({
        //         c_intervalCount: this.state.c_intervalCount + 1,
        //         c_x: m.x,
        //         c_y: m.y
        //     })
        // }, 1000)

    }

    getCursorXY(e){ 
        //console.log(window.Event.clientY);
        var c_x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var c_y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        return {x: c_x, y: c_y};
        //return {x: 0, y: 0}
    }
    */

