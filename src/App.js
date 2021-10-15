
import React from 'react';

import Header from './components/Header';
import CountriesList from './components/CountriesList';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-wrapper">
      <CountriesList />
      </div>
    </div>
  );
}


export default App;
