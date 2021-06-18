import React from 'react';
import './App.css';
import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SingleAnimal } from "./components/SingleAnimal";
import { Notifications } from './components/Notifications';

function App() {
  return (
    <>
      <div className="bgImage">
        <h1 style={{ color: "white" }}>Zootopia</h1>
        
      </div >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/animals/:id">
            <SingleAnimal></SingleAnimal>
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
