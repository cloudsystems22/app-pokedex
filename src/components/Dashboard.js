import React, { Component } from 'react';
import './home.css';
import apiPokemon from '../apis/api-pokemon';
import apiPokedex from '../apis/api-pokedex'
import { logout } from "../auth/auth";
import SideNav from './SideNav';

class Dashboard extends Component{
    state = {
        pokemons:[]
    }

    async componentWillMount(){
        const response = await apiPokemon.get('');
        this.setState({ pokemons: response.data });
    }

    // handleLogout = () => {
    //     logout();
    // }

    handleCapture = async (number, name, generation, type, baseAttack) => {
        try{
            const pokemon = await apiPokedex.post('pokemons/create', { number, name, generation, type, baseAttack });
          } catch (err){
            console.log(err);
            this.setState({ error: "Erro ao cadastrar usuário!" });
          }
    }
    
    render(){
        const { pokemons } = this.state;
        let uri;
        return(
            <div className='corpo-dashboard'>
                <div className='side-nav'>
                    {/* <a href='#!' onClick={this.handleLogout}><i class="fas fa-sign-out-alt fa-3x"></i></a> */}
                    <SideNav />
                </div>
                <div className='corpo-right'>
                    <h1>Área de Captura</h1>
                    <div className='listaPokemons'>
                        {console.log(pokemons)}
                        {pokemons.map((p) => 
                            <div className='card-pokemon'>
                                <h3>{p.Name}</h3>
                                <div className='avatar-pokemon'>
                                    <img src={`https://raw.githubusercontent.com/alexandreservian/react-table-example-pokemon/master/public/assets/thumbnails/${p.Number}.png`}/>
                                </div>
                                <p>Geração: {p.Generation}</p>
                                <p>Tipo: {JSON.stringify(p.Types)}</p>
                                <p>Quant.: {p['Base Attack']}</p>
                                <button onClick={ e => this.handleCapture(p.Number, p.Name, p.Generation, p.Types, p['Base Attack'])}>Capturar</button>
                            </div>
                        )}
                    </div>

                </div>
                <div>

                </div>
            </div>
        )
    }

}

export default Dashboard