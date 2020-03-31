import React from 'react';
import './App.css';
import LevelManager from './levelManager.jsx';

function App() {
  return (
    <div className="App">
      <LevelManager />
    </div>
  );
}

export default App;

global.getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}