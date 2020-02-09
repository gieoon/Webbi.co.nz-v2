import React from 'react';
import Start from './start.jsx';
import Level1 from './Levels/1/1.jsx';
import Level2 from './Levels/2/2.jsx';
import Level3 from './Levels/3/3.jsx';

export default class LevelManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentLevel: 3, //0
            wrongCount: 0,
            b_wrongCountVisible: false
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
        // Using state refreshes everything, so don't use it
        const w = document.getElementById("wrongCount-container");
        w.innerHTML = Number(w.innerHTML) + 1;
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
            <div>
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