import React, { useState, useEffect } from "react";

import { Animal } from "../models/Animal";
import { Link } from "react-router-dom";


export function Notifications() {
  const defaultAnimals: Animal[] = [];
  const [animals, setAnimals] = useState(defaultAnimals);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
      const interval = setInterval(() => {
        populateNotifiedAnimals();
      }, 1000);
      //setToggle(!toggle);
      return()=>clearInterval(interval);
  }, []);

  const populateNotifiedAnimals = () => {
    console.log("populate");
    let anims: Animal[] = [];
    const animalsFromStore = window.localStorage.getItem("Animals");
    if (animalsFromStore) {
      anims = JSON.parse(animalsFromStore);
      const filteredAnimals = anims.filter((a: Animal) => (new Date().getTime() - new Date(a.lastFed).getTime()) >= 14400000);
      setAnimals([...filteredAnimals]);
    }

  };

  const handleClick = () => {
    setNotificationVisible(!notificationVisible);
  };

  return (
    <div style={{textAlign: "right"}}>
      {animals.length > 0 ? <span><div className="bgNotification">{animals.length} animal(s) not fed since last 4 hours</div><button className="btn btn-outline-danger" onClick={handleClick}>{notificationVisible ? 'Hide Details' : 'Show details'}</button></span> : ''}
      {notificationVisible ? <div className="alert alert-success container" role="alert">
          <div className="row">
            {animals.map((animal: Animal, index: number) => <div className="col-sm-3" key={index}><Link to={`/animals/${animal.id}`}>{animal.name} need to be fed</Link></div>)}
          </div>
          
        
      </div> : ''}

    </ div>
  );
}