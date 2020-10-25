import React, { Component } from 'react'
import './home.css'
import apiPokedex from '../apis/api-pokedex'
import { login } from "../auth/auth";
import { Link, withRouter } from "react-router-dom";
import { ThemeConsumer } from 'styled-components';


class Home extends Component{
  
  state = {
    name:"",
    email:"",
    password:"",
    token: "",
    secret: "",
    error:""
  }


  handleRegister = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if(!email || !password){
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try{
        const registro = await apiPokedex.post('auth/register', { name, email, password });
        alert('Cadastrado com sucesso!');
        let telaCadastro = document.getElementById('telaCadastro');
        telaCadastro.classList.toggle('tela-visivel');
      } catch (err){
        console.log(err);
        this.setState({ error: "Erro ao cadastrar usuário!" });
      }
      
    }
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await apiPokedex.post("auth/authenticate", { email, password });
        login(response.data.token);
        this.props.history.push("/dashboard");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };
  handlerVerification = async e => {
    e.preventDefault();
    const { secret, token, email } = this.state;
    if(!token){
      this.setState({ error: 'Informe mº do token'});
    } else {
      try{
        const verificacao = await apiPokedex.post('auth/verify', { secret, token, email });
        console.log(verificacao);
        login(verificacao.data.token);
        this.props.history.push("/dashboard");
      } catch(err){
        console.log(err);
      }
    }

  };

  handlerQrCode = async e => {
    e.preventDefault();
    const {email} = this.state;
    if(!email){
      this.setState({ error: 'Informe um email'});
    } else {
      try{
        const autent = await apiPokedex.post('auth/qrcode', { email });
        let qrcodeAuthdiv = document.getElementById('qrcodeAuthdiv');
        qrcodeAuthdiv.classList.remove('img-visivel');

        let qrcodeAuth = document.getElementById('qrcodeAuth');
        let inputSecret = document.getElementById('inputSecret');
        qrcodeAuth.src = autent.data.qrcode;
        inputSecret.value = autent.data.secret;

      } catch(err){

      }
    }
  }

  handlerAuth2factor = e => {
    e.preventDefault();
    let telaLogin = document.getElementById('telaLogin');
    telaLogin.classList.remove('tela-visivel');

    let auth2factor = document.getElementById('auth2factor');
    auth2factor.classList.toggle('tela-visivel');
  }

  handlerLoginSenha = e => {
    e.preventDefault();
    let auth2factor = document.getElementById('auth2factor');
    auth2factor.classList.remove('tela-visivel');

    let telaLogin = document.getElementById('telaLogin');
    telaLogin.classList.toggle('tela-visivel');
  }

  handleFormLoginVisivel = e =>{
    e.preventDefault();
    let telaCadastro = document.getElementById('telaCadastro');
    telaCadastro.classList.remove('tela-visivel');

    let telaLogin = document.getElementById('telaLogin');
    telaLogin.classList.toggle('tela-visivel');
  }

  handleFormCadstroVisivel = e => {
    e.preventDefault();
    let auth2factor = document.getElementById('auth2factor');
    auth2factor.classList.remove('tela-visivel');

    let telaLogin = document.getElementById('telaLogin');
    telaLogin.classList.remove('tela-visivel');

    let telaCadastro = document.getElementById('telaCadastro');
    telaCadastro.classList.toggle('tela-visivel');
  }
  
  render(){
          
    return(
      <div className='fundo-pokemon'>
        <button className='btn-pegue-seu' onClick={this.handlerAuth2factor}>Pegue o seu!</button>
        <div className='auth2factor-login' id='auth2factor'>
            <button className='btn-close' onClick={this.handlerAuth2factor}><i class="fas fa-times fa-2x"></i></button>
            <h3>Autenticação em 2 fatores!</h3>
            <p>Quero acessar usando <a href="#!" onClick={this.handlerLoginSenha}>login e senha</a></p>
            <div className='form'>
              <form onSubmit={this.handlerVerification}>
                {this.state.error && <p>{this.state.error}</p>}
                <div className='input-camp'>
                  <input className='input-formt' id='input-email' placeholder='Usuário' type='text' onChange={e => this.setState({ email: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <button className='btn-primary' id='btngerar' onClick={this.handlerQrCode}>Clique para gerar o QRCODE</button>
                </div>
                <div className='qrcode-auth img-visivel' id='qrcodeAuthdiv'>
                  <img id='qrcodeAuth' src=''/>
                  <p>
                    <input className='input-formt' placeholder='Nº Token 000 000' onChange={e => this.setState({ token: e.target.value})}/>
                    <input type='text' id='inputSecret' onChange={e => this.setState({ secret: e.target.value })}/>
                  </p>
                  <button className='btn-primary' id='btnEntrar' type="submit">Entrar</button>
                </div>
                <p>Não possue um cadastro? Click <a href='#!' onClick={this.handleFormCadstroVisivel}>aqui.</a></p>                 
                
              </form>
            </div>
        </div>
        <div className='login' id='telaLogin'>
            <button className='btn-close' onClick={this.handleFormLoginVisivel}><i class="fas fa-times fa-2x"></i></button>
            <h3>Login</h3>
            <p>Quero acessar usando <a href="#!" onClick={this.handlerAuth2factor}>Autenticação em 2 fatores</a></p>
            <div className='form'>
              <form onSubmit={this.handleSignIn}>
                {this.state.error && <p>{this.state.error}</p>}
                <div className='input-camp'>
                  <input className='input-formt' id='input-email' placeholder='Usuário' type='text' onChange={e => this.setState({ email: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <input className='input-formt' id='input-senha' placeholder='Senha' type='password' onChange={e => this.setState({ password: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <button className='btn-primary' id='btnEntrar' type="submit">Entrar</button>
                  <p>Não possue um cadastro? Click <a href='#!' onClick={this.handleFormCadstroVisivel}>aqui.</a></p>
                </div>
              </form>
            </div>
        </div>
        <div className='cadastro' id='telaCadastro'>
            <button className='btn-close' onClick={this.handleFormCadstroVisivel}><i class="fas fa-times fa-2x"></i></button>
            <h3>Registre-se</h3>
            <div className='form'>
              <form onSubmit={this.handleRegister}>
              {this.state.error && <p>{this.state.error}</p>}
                <div className='input-camp'>
                  <input className='input-formt' id='input-nome-cad' placeholder='Nome' type='text' onChange={e => this.setState({ name: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <input className='input-formt' id='input-email-cad' placeholder='Usuário' type='text' onChange={e => this.setState({ email: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <input className='input-formt' id='input-senha-cad' placeholder='Senha' type='password' onChange={e => this.setState({ password: e.target.value })}/>
                </div>
                <div className='input-camp'>
                  <button className='btn-primary' id='btnCadastrar' type="submit">Cadastrar</button>
                  <p>Para entrar? Click <a href='#!' onClick={this.handleFormLoginVisivel}>aqui.</a></p>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);