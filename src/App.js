// import React from "react";
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonUrl, setPokemonUrl] = useState([]);

    const [currentPageUrl, setcurrentPageUrl] = useState(
        "https://pokeapi.co/api/v2/pokemon"
    );
    const [nextPageUrl, setnextPageUrl] = useState();
    const [previusPageUrl, setpreviusPageUrl] = useState();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);

        let cancel;

        function getPokemon() {
            return axios.get(currentPageUrl, {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            });
        }

        Promise.all([getPokemon()]).then(function (results) {
            setPokemon(results[0].data.results.map((p) => p.name));
            setPokemonUrl(results[0].data.results.map((p) => p.url));
            setnextPageUrl(results[0].data.next);
            setpreviusPageUrl(results[0].data.previous);
            setloading(false);
        });

        return () => cancel();
    }, [currentPageUrl]);

    function goToNextPage() {
        setcurrentPageUrl(nextPageUrl);
    }
    function goToPrevPage() {
        setcurrentPageUrl(previusPageUrl);
    }

    if (loading) return "Loading...";

    return (
        <>
            <div className="app-container">
                <h1>Pokemons</h1>
                <Pagination
                    key="pagination"
                    goToNextPage={nextPageUrl ? goToNextPage : null}
                    goToPrevPage={previusPageUrl ? goToPrevPage : null}
                />
                <PokemonList
                    key="pokemonlist"
                    pokemon={pokemon}
                    pokemonUrl={pokemonUrl}
                    setloading={setloading}
                />
            </div>
        </>
    );
}

export default App;

// Promise.all(getPokemon()).then((res) => {
//     setloading(false);
//     setPokemon(res.data.results.map((p) => p.name));
//     setPokemonUrl(res.data.results.map((p) => p.url));
//     setnextPageUrl(res.data.next);
//     setpreviusPageUrl(res.data.previous);
// });
