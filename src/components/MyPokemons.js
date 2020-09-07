import React, { Component } from 'react';
import './home.css';
import apiPokedex from '../apis/api-pokedex';
import SideNav from './SideNav';

class MyPokemons extends Component{
    state = {
        pokemons:[],
        id:""
    }

    async componentWillMount(){
        const response = await apiPokedex.get('/pokemons');
        this.setState({ pokemons: response.data.pokemons });
    }

    handlerExcluir = async (id, pokemon) =>{
        if(window.confirm('Deseja excluir o ' + pokemon + '?'))
        await apiPokedex.delete('/pokemons/' + id);     
    }

    render(){
        const { pokemons } = this.state;
        const deleteTodos = () =>{
            if(window.confirm("Deseja excluir todos os pokemons?")){
                pokemons.map(async(p) =>
                    //console.log(p._id)
                    await apiPokedex.delete('/pokemons/' + p._id)
                )
            }
        }
        return(
            <div className='corpo-dashboard'>
                <div className='side-nav'>
                    <SideNav />
                </div>
                <div className='corpo-right'>
                    <h1>Minha Pokebola</h1>
                    <p><button className='btn-secundary' onClick={deleteTodos}>Excluir todos</button></p>
                    <div className='listaPokemons'>
                        {/* {console.log(pokemons)} */}
                        {pokemons.map((p) => 
                            <div className='card-pokemon'>
                                <h3>{p.name}</h3>
                                <div className='avatar-pokemon'>
                                    <img src={`https://raw.githubusercontent.com/alexandreservian/react-table-example-pokemon/master/public/assets/thumbnails/${p.number}.png`}/>
                                </div>
                                <p>Geração: {p.generation}</p>
                                <p>Tipo: {JSON.stringify(p.types)}</p>
                                <p>Quant.: {p.baseAttack}</p>
                                <button onClick={ e => this.handlerExcluir(p._id, p.name)}>Apagar</button>
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

export default MyPokemons