import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Home from '../Home';


function PrivateRoute(props) {        
    return (
        props.currentLoginState?
        <Route path="/home">
            <Home {...props}/>
        </Route>
        : 
        <Redirect to='/' />   
    )
}
export default PrivateRoute