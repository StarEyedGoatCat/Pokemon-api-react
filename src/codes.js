// pokemon update
Promise.all(getPokemon()).then((res) => {
    setloading(false);
    setPokemon(res.data.results.map((p) => p.name));
    setPokemonUrl(res.data.results.map((p) => p.url));
    setnextPageUrl(res.data.next);
    setpreviusPageUrl(res.data.previous);
});

// url update
setPokemon(results[0].data.results.map((p) => p.name));
setPokemonUrl(results[0].data.results.map((p) => p.url));
setnextPageUrl(results[0].data.next);
setpreviusPageUrl(results[0].data.previous);
setloading(false);
