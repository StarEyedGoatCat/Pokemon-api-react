import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokePopUp({ info }) {
    // species - url -- evolution_chain - url -- chain - species - name

    const speciesUrl = info.species.url;
    const [evoUrl, setevoUrl] = useState("");
    const [evoName, setevoName] = useState([]);

    useEffect(() => {
        function getThisData() {
            axios.get(speciesUrl).then((res) => {
                setevoUrl(res.data.evolution_chain.url);
            });
        }
        getThisData();
        return () => {};
    }, [speciesUrl]);

    useEffect(() => {
        async function getEvolutions() {
            await axios.get(evoUrl).then((res) => {
                try {
                    setevoName([res.data.chain.species.name]);
                    try {
                        if (res.data.chain.evolves_to[0].species) {
                            setevoName((state) => [
                                ...state,
                                res.data.chain.evolves_to[0].species.name,
                            ]);
                        }
                        try {
                            if (
                                res.data.chain.evolves_to[0].evolves_to[0]
                                    .species
                            ) {
                                setevoName((state) => [
                                    ...state,
                                    res.data.chain.evolves_to[0].evolves_to[0]
                                        .species.name,
                                ]);
                            }
                            try {
                                if (
                                    res.data.chain.evolves_to[0].evolves_to[0]
                                        .evolves_to[0].species
                                ) {
                                    setevoName((state) => [
                                        ...state,
                                        res.data.chain.evolves_to[0]
                                            .evolves_to[0].evolves_to[0].species
                                            .name,
                                    ]);
                                }
                            } catch (error) {}
                        } catch (error) {}
                    } catch (error) {}
                } catch (err) {}
            });
        }

        if (evoUrl) {
            getEvolutions();
        }
        return () => {};
    }, [evoUrl]);

    return (
        <div className="pop-up">
            <h2>Know more!</h2>

            <div id={info.name + info.id} className="data-container">
                <div className="name">
                    <div>Name:</div>
                    <div>{info.name}</div>
                </div>
                <div className="name">
                    <div>Type:</div>
                    <div>
                        {info.types
                            .map((type) => type.type.name)
                            .map((type, index) => {
                                return <div key={index}> {type} </div>;
                            })}
                    </div>
                </div>
                <div className="name">
                    <div>Sprite:</div>
                    <div>
                        <img alt="" src={info.sprites.front_default}></img>
                    </div>
                </div>
                <div className="name">
                    <div>Evolutions:</div>
                    <div>
                        {evoName.map((evo, index) => (
                            <div key={index}>{evo}</div>
                        ))}{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
