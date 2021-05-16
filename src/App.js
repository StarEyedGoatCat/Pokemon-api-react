import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [species, setSpecies] = useState(null);
    const [evolution, setEvolution] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [url, setUrl] = useState(
        "https://pokeapi.co/api/v2/pokemon?limit=15"
    );
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisibility] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchItem = async (url) => {
            try {
                return await axios(url, { cancelToken: source.token });
            } catch (error) {
                throw error;
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios(url, {
                    cancelToken: source.token,
                });
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);

                const results = await Promise.all(
                    (response.data.results || []).map((key) =>
                        fetchItem(key.url)
                    )
                );

                const singleItem = await results.map((result) => {
                    const { id, name, weight, height, types, abilities } =
                        result.data;
                    const speciesURL = result.data.species.url;

                    const image = result.data.sprites.front_default;

                    return {
                        id,
                        name,
                        weight,
                        height,
                        image,
                        types,
                        abilities,
                        speciesURL,
                    };
                });

                setPokemonList(singleItem);
            } catch (error) {
                throw error;
            }
        };

        fetchData();

        return () => {
            source.cancel();
        };
    }, [url]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chains = await pokemonList.map(
                    (pokemon) => pokemon.speciesURL
                );
                console.log(chains);
                const response = await chains.map((chainUrl) =>
                    axios(chainUrl)
                );
                console.log(response);
                const results = await (
                    await Promise.all(response || [])
                ).map((res) => {
                    const evoChain = res.data.evolution_chain.url;
                    const evoFrom = res.data.evolves_from_species;
                    const generation = res.data.generation;

                    return {
                        evoChain,
                        evoFrom,
                        generation,
                    };
                });
                console.log(results);
                setSpecies(results);
            } catch (error) {}
        };

        fetchData();

        return () => {};
    }, [pokemonList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const evolution = await species.map(
                    (pokemon) => pokemon.evoChain
                );
                console.log(evolution);

                const response = await evolution.map((evoUrl) => axios(evoUrl));
                console.log(response);

                const results = await (
                    await Promise.all(response || [])
                ).map((res) => res.data);
                console.log(results);

                setEvolution(results);
            } catch (error) {}
        };

        fetchData();

        return () => {};
    }, [species]);

    const onSelected = (id) => {
        setModalVisibility(true);
        setSelectedItem(id);
    };

    const onHideModal = () => {
        setSelectedItem(null);
        setModalVisibility(false);
    };

    const onClickNext = () => setUrl(nextUrl);

    const onClickPrevious = () => setUrl(prevUrl);

    return <div></div>;
}

export default App;
