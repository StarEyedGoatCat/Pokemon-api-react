import React, { useState } from "react";
import PokePopUp from "./PokePopUp";

export default function PokemonCard({ info }) {
    const [isShow, setIsShown] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            className="pokemon"
            id={info.id}
        >
            <h2>{info.name}</h2>
            <img
                rel="preload"
                as="image"
                src={info.sprites.front_default}
                alt=""
            ></img>

            {isShow && <PokePopUp info={info} />}
        </div>
    );
}

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
