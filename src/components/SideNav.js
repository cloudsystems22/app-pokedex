import React, { Component } from 'react';
import './home.css';
import { logout } from "../auth/auth";
import { Link } from "react-router-dom";
import logo from '../images/pokemon-logo.jpg';

class SideNav extends Component {
    handleLogout = () => {
        logout();
    }

    render(){
        return(
            <div>
                <Link to={'/dashboard'}>
                    <img src={logo} className='logo'/>
                </Link>
                <ul className='nav-list'>
                    <li><Link to={'/dashboard'}>Área de captura</Link></li>
                    <li><Link to={'/mypokemons'}>Minha pokebola</Link></li>
                    <li>
                        <a href='#!' onClick={this.handleLogout}><i class="fas fa-sign-out-alt fa-2x"></i> Sair</a>
                    </li>
                </ul>
            </div>
        )
    }

}

export default SideNav