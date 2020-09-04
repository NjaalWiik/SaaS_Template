import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>This is the header component</header>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;
