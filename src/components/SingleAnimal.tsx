import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Animal } from "../models/Animal";
import { Link } from "react-router-dom";

interface IParams {
    id: string;
}

export const SingleAnimal = () => {
    const defaultAnimals: Animal[] = [];
    const [animals, setAnimals] = useState(defaultAnimals);
    const defaultAnimal: Animal = new Animal(0, "", "", "", "", false, "", 0, "", new Date());
    const [animal, setAnimal] = useState(defaultAnimal);
    const [loaded, setLoaded] = useState(false);
    let { id } = useParams<IParams>();

    useEffect(() => {
        if (id) {
            getAnimalFromStore(Number.parseInt(id))
        }
        // eslint-disable-next-line
    }, []);

    const getAnimalFromStore = (id: number) => {
        const animalsInStore = window.localStorage.getItem("Animals");
        if (animalsInStore) {
            const animals = JSON.parse(animalsInStore);
            setAnimals(animals);
            const animalInstance = animals.filter((a: Animal) => a.id === id);
            if (animalInstance && animalInstance.length > 0) {
                setAnimal(animalInstance[0]);
                setLoaded(true);
            }
            else {
                //TBD not found
            }

            //console.log("A", animal);
        }
    };

    useEffect(() => {
        feedChecker()
    }, [animal])



    const feedChecker = async () => {
        //console.log("A", animal);
        if (animal.isFed) {
            const timeLeftToFeed = (new Date(animal.lastFed).getTime() + 10800000 - new Date().getTime());

            let x = 0;
            let timerId = await setInterval(async () => {
            }//console.log(++x)
                , 1000);

            // after 5 seconds stop
            setTimeout(() => { clearInterval(timerId); manageFeeding(false) }, timeLeftToFeed);
        }
    };




    const manageFeeding = (feed: boolean) => {
        //console.log("A", animal);
        const index = animals.findIndex((a: Animal, index: number) => a.id === animal.id);
        //console.log(index);
        if (index !== -1) {
            const modifiedAnimalData = [...animals];
            if (feed) {
                modifiedAnimalData[index] = { ...animal, isFed: true, lastFed: new Date() };
                setAnimal({ ...animal, isFed: true, lastFed: new Date() });
                setAnimals(modifiedAnimalData);
                window.localStorage.setItem("Animals", JSON.stringify(modifiedAnimalData));
                let notifications: number[] = [];
                const nots = window.localStorage.getItem("Notifications");
                if (nots) {
                    notifications = JSON.parse(nots);
                }
                const notIndex = notifications.indexOf(animal.id);
                if (notIndex !== -1)
                    notifications.splice(notIndex, 1);
            }
            else {
                const timeSpent = (new Date().getTime() - new Date(animal.lastFed).getTime()) / 1000;
                if (timeSpent > 10800 && animal.isFed) {
                    modifiedAnimalData[index] = { ...animal, isFed: false };
                    setAnimal({ ...animal, isFed: false });
                    setAnimals(modifiedAnimalData);
                    window.localStorage.setItem("Animals", JSON.stringify(modifiedAnimalData));
                }
            }
        }
    }

    const feedAnimal = () => {
        manageFeeding(true);
        //setAnimal({ ...animal, isFed: true, lastFed: new Date() });

    };

    const formatDate = (dt: Date): string => {
        var d = new Date,
            dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
            return dformat;
    }

    return (
        <div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "60%" }}>
                    <h3 className="text-success">{animal.name} - Last Fed at {formatDate(animal.lastFed)}</h3>

                    <span>{animal.latinName}</span>
                    <span style={{ marginBottom: "15px" }}>Year of Birth:{animal.yearOfBirth}</span>
                    <img style={{ height: "300px", width: "300px" }} src={animal.imageUrl} alt={animal.name} />
                    <p style={{ height: "60px", width: "60%" }}>{animal.shortDescription}</p>


                    <span>
                        <Link className="btn btn-success" to="/" style={{ marginRight: "1rem" }}>Back</Link>
                        <button className={!animal.isFed ? 'btn btn-success' : 'btn btn-secondary'} disabled={animal.isFed} onClick={feedAnimal}>Feed {!animal.isFed ? "now" : "later"}</button>
                    </span>

                    <div>

                    </div>
                </div>
            </div>
        </div>

    );
};
