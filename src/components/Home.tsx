import React, { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import { AnimalComp } from "./AnimalComp";
import { Notifications } from "./Notifications";
import axios from "axios";



export function Home() {
    const defaultAnimals: Animal[] = [];
    const [animals, setAnimals] = useState(defaultAnimals);


    useEffect(() => {
        const animalsInStore = window.localStorage.getItem("Animals");
        if (!animalsInStore) {

            axios
                .get<Animal[]>("https://animals.azurewebsites.net/api/animals")
                .then((response) => {
                    console.log(response.data);
                    setAnimals(response.data);
                    window.localStorage.setItem("Animals", JSON.stringify(response.data));
                });

        }
        else {
            setAnimals(JSON.parse(animalsInStore));
        }
    }, []);

    return (
        <div className="container">

            <div style={{ marginBottom: "1rem"}}>
                <Notifications />
            </div>

            <div className="row">
                {animals.map((anim: Animal, index) => <AnimalComp key={index} animal={anim} />)}
            </div>



        </div>
    );
}
