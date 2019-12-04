import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SignIn,SignUp,Header,Home,MongoDB } from './components'

function App() {
  return (
    
    <Router>
      <Header/>
      <Switch>
        <Route path="/signin">
            <SignIn />
        </Route>
        <Route path="/signup">
            <SignUp />
        </Route>
        <Route path="/home" exact={true}>
            <Home />
        </Route>
        <Route path="/mongodb">
            <MongoDB />
        </Route>
    </Switch>
  </Router>
  );
}

export default App;
