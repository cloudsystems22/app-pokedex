import React, { Component } from 'react';
import './home.css';
import apiPokemon from '../apis/api-pokemon';
import apiPokedex from '../apis/api-pokedex'
import { logout } from "../auth/auth";

class Dashboard extends Component{
    state = {
        pokemons:[]
    }

    async componentWillMount(){
        const response = await apiPokemon.get('');
        this.setState({ pokemons: response.data });
    }

    handleLogout = () => {
        logout();
    }

    handleCapture = async (name, generation, type, baseAttack) => {
        try{
            const pokemon = await apiPokedex.post('pokemons/create', { name, generation, type, baseAttack });
            console.log(pokemon);
            alert('Cadastrado com sucesso!');
          } catch (err){
            console.log(err);
            this.setState({ error: "Erro ao cadastrar usuário!" });
          }
    }
    
    render(){
        const { pokemons } = this.state;
        let types;
        return(
            <div className='corpo-dashboard'>
                <div className='side-nav'>
                    <a href='#!' onClick={this.handleLogout}><i class="fas fa-sign-out-alt fa-3x"></i></a>
                </div>
                <div className='corpo-right'>
                    <h1>Dashboard</h1>
                    <div className='listaPokemons'>
                        {console.log(pokemons)}
                        {pokemons.map((p) => 
                            <div className='card-pokemon'>
                                <h3>{p.Name}</h3>
                                <p>Geração: {p.Generation}</p>
                                <p>Tipo: {JSON.stringify(p.Types)}</p>
                                <p>Quant.: {p['Base Attack']}</p>
                                <button>Capturar</button>
                            </div>
                        )}
                    </div>

                </div>
                {/* <ul>
                    
                </ul> */}
                <div>

                </div>
            </div>
        )
    }

}

export default Dashboard