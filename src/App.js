import React from 'react';
import './App.scss';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Pricing from './components/Pricing';
import About from './components/About';
import SheetPage from './components/SheetPage';

function App() {
  return (
    <div className="App">
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
          <Route path='/pages/:pageId'>
            <SheetPage />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
