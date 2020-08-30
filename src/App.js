import React from 'react';
import './App.scss';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Pricing from './components/Pricing';
import About from './components/About';
import SheetPage from './components/SheetPage';

import * as firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiw4ORAbMmxImx4qPGq9JAFtUI36PeYQ0",
  authDomain: "sheets2website-1598313088115.firebaseapp.com",
  databaseURL: "https://sheets2website-1598313088115.firebaseio.com",
  projectId: "sheets2website-1598313088115",
  storageBucket: "sheets2website-1598313088115.appspot.com",
  messagingSenderId: "1082271392691",
  appId: "1:1082271392691:web:45c06be046a0a72b5b21c6",
  measurementId: "G-ZWGE5NLZ4Z"
};

firebase.initializeApp(firebaseConfig);
// console.log(firebase);
const db = firebase.firestore();
global.db = db;

function App() {
  return (
    <div className="App">
      <DebugRouter>
        <Router>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/pricing'>
              <Pricing />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route path='/page/:shortId/:pageName?'>
              <SheetPage />
            </Route>
            
          </Switch>
        </Router>
      </DebugRouter>
    </div>
  );
}

export default App;

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    console.log('window.location.host: ', window.location.host);
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}
