import React from 'react';
import logo from './logo.svg';
import './App.css';
import Indexer from './components/Indexer/Indexer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Indexer />
      </header>
    </div>
  );
}

export default App;
