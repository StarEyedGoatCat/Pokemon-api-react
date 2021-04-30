import React from "react";

export default function PokemonCard({ info }) {
    return (
        <div className="pokemon" id={info.id}>
            <h2>{info.name}</h2>
            <img
                rel="preload"
                as="image"
                src={info.sprites.front_default}
            ></img>
        </div>
    );
}
