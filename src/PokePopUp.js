import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokePopUp({ info }) {
    // species - url -- evolution_chain - url -- chain - species - name

    let speciesUrl = info.species.url;
    const [evolutionChain, setevolutionChain] = useState([]);

    const evolutionChainUrl = function evolutionChainUrl() {
        return axios
            .get(speciesUrl)
            .then((res) => res.data.evolution_chain.url);
    };

    const evolutionChainData = async function evolutionChainData() {
        axios.get(evolutionChainUrl).then(async (res) => res.data);
    };

    console.log(evolutionChainUrl().then((res) => res.data));
    console.log(evolutionChainData());

    return (
        <div className="pop-up">
            <h2></h2>
            <div id={info.name + info.id} className="data-container">
                <div className="name">
                    <div>Name:</div>
                    <div>{info.name}</div>
                </div>
                <div className="name">
                    <div>Type:</div>
                    {info.types
                        .map((type) => type.type.name)
                        .map((type) => {
                            return <div> {type} </div>;
                        })}
                </div>
                <div className="name">
                    <div>Sprite:</div>
                    <div>
                        <img src={info.sprites.front_default}></img>
                    </div>
                </div>
                <div className="name">
                    <div>Is Baby:</div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
