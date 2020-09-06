import axios from 'axios';

const uri = 'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json';

const apiPokemon = axios.create({
    baseURL: uri,
  });

export default apiPokemon;