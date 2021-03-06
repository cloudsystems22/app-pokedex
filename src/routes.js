import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth/auth'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import MyPokemons from './components/MyPokemons'

const PrivateRoute = ({ component: Component, ...rest}) => (
   <Route {...rest} render={props => 
    isAuthenticated() ? (
            <Component {...props} />
        ):(
            <Redirect to={{pathname: '/', state: { from: props.location }}}/>
        )
    }
    />
);


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/mypokemons" component={MyPokemons} />
            {/* <Route path='/dashboard' component={Dashboard} /> */}
        </Switch>
    </BrowserRouter>
)

export default Routes;