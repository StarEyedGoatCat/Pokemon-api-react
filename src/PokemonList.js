import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemon, pokemonUrl }) {
    const [pokemonInfo, setpokemonInfo] = useState([]);

    useEffect(() => {
        async function getPokemonInfo(url) {
            return await axios.get(url);
        }

        Promise.all(pokemonUrl.map((url) => getPokemonInfo(url))).then((res) =>
            res.map((res) =>
                setpokemonInfo((state) => [
                    ...state,
                    {
                        name: res.data.name,
                        info: res.data,
                        sprite: res.data.sprites.front_default,
                    },
                ])
            )
        );

        return;
    }, [pokemonUrl]);

    return (
        <div className="pokemon-container">
            {pokemonInfo.map((p) => (
                <PokemonCard key={p.info.id} info={p.info} />
            ))}
        </div>
    );
}
