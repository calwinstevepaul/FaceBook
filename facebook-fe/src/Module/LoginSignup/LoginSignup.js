import React, { Component } from 'react'
import './LoginSignup.css'
import Login from './Comp/Login'
import Signup from './Comp/Signup'

export class LoginSignup extends Component {
    render() {
        return (
            <div className="loginsignup">
                <Login {...this.props}/>
                <Signup {...this.props}/>
            </div>
        )
    }
}

export default LoginSignup
