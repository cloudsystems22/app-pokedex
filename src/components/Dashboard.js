import React, { Component } from 'react'
import './home.css'
import apiPokemon from '../apis/api-pokemon'
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
    
    render(){
        const { pokemons } = this.state;
        return(
            <div className='corpo-dashboard'>
                <div className='side-nav'>
                    <a href='#!' onClick={this.handleLogout}>Logout</a>
                </div>
                <div className='corpo-right'>
                    <h1>Dashboard</h1>
                    <div className='listaPokemons scroll'>
                        {pokemons.map((p) => 
                            <div className='card-pokemon'>
                                <h3>{p.Name}</h3>
                                <p>{p.Generation} - {p.Number}</p>
                                <button>Capturar</button>
                            </div>
                        )}
                    </div>

                </div>
                {/* <ul>
                    
                </ul> */}
            </div>
        )
    }

}

export default Dashboard