import React, { Component } from 'react'
import LoginSignup from './Module/LoginSignup/LoginSignup'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './Module/Comp/PrivateRoute';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLogin:localStorage.getItem('token')?true:false
    }
  }

  changeLoginState=(value)=>{
    this.setState({
      isLogin:value
    })
  }
  
  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginSignup changeLoginState={this.changeLoginState} currentLoginState={this.state.isLogin} />
          </Route>

          <Route path="/home">
            <PrivateRoute changeLoginState={this.changeLoginState} currentLoginState={this.state.isLogin} />
          </Route>
        </Switch>
      </Router>
        
      </div>
    )
  }
}

export default App

