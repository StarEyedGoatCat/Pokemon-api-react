import React, { useState } from "react";
import PokePopUp from "./PokePopUp";

export default function PokemonCard({ info }) {
    function logPokemon() {
        console.log(info);
    }

    const [isShow, setIsShown] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={logPokemon}
            className="pokemon"
            id={info.id}
        >
            <h2>{info.name}</h2>
            <img
                rel="preload"
                as="image"
                src={info.sprites.front_default}
            ></img>
            {isShow && <PokePopUp key={info.name + info.id} info={info} />}
        </div>
    );
}

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
