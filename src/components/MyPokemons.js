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

  

    handlerDelete = async (e) => {
        e.preventDefault();
        const { id } = this.state
        alert(id);
        // try{
        //     await apiPokedex.delete('/pokemons/', { id })
        // } catch (err){
        //     console.log(err);
        // }
    }

    handlerExcluir = async (id) =>{
        //try{
            await apiPokedex.delete('/pokemons/' + id);
            console.log('Olá mundo');
        //} catch (err){
            //console.log(err);
        //}
    }
    
    render(){
        const { pokemons } = this.state;
        return(
            <div className='corpo-dashboard'>
                <div className='side-nav'>
                    <SideNav />
                </div>
                <div className='corpo-right'>
                    <h1>Minha Pokebola</h1>
                    <div className='listaPokemons'>
                        {console.log(pokemons)}
                        {pokemons.map((p) => 
                            <div className='card-pokemon'>
                                <h3>{p.name} <input type='hidden' value={p._id} id={p._id} /></h3>
                                <p>Geração: {p.generation}</p>
                                <p>Tipo: {JSON.stringify(p.types)}</p>
                                <p>Quant.: {p.baseAttack}</p>
                                <button onClick={ e => this.handlerExcluir(p._id)}>Apagar</button>
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