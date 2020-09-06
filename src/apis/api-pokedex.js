import axios from 'axios';
import { getToken } from "../auth/auth";

const uri = 'https://pokedexback.herokuapp.com';

const apiPokedex = axios.create({
    baseURL: uri,
});

apiPokedex.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiPokedex;