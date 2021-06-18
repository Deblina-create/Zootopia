import React from "react";
import { Animal } from "../models/Animal";
import { Link } from "react-router-dom";

interface IAnimalProps {
  animal: Animal;

}


export function AnimalComp(props: IAnimalProps) {
  return (

    <div className="col-sm-4 card">
      <img style={{ height: "300px", width: "300px" }} src={props.animal.imageUrl} alt={props.animal.name} />
      <div className="card-body">
        <h5 className="card-title text-success">{props.animal.name}</h5>
        <p className="card-text">{props.animal.shortDescription}</p>
        <Link to={`/animals/${props.animal.id}`} className="btn btn-success">Details</Link>
        
      </div>

    </div>


  );
}