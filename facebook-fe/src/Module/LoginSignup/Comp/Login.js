import React, { Component } from 'react'
import logo from '../../../Images/logo.png'
import LoginInputBox from '../../ReusableComp/LoginInputBox'
import {plainApi} from '../../../apiCall'
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'


export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginEmail:"",
            loginPassword:""
        }
    }

    eventHandle=(e)=>{
        let value = e.target.value
        if (e.target.name === "loginEmail") {
            value = e.target.value.toLowerCase();
        }
        this.setState({
            [e.target.name]: value
        })
    }  
    submit=()=>{
        plainApi.post("/auth/login",{
            loginName:this.state.loginEmail,
            loginPassword:this.state.loginPassword
        }).then((res)=>{
            console.log("res",res.data)
            if(res.data.message === "login successful") {
                localStorage.setItem("token",JSON.stringify(res.data.token))
                this.props.changeLoginState(true)
                this.props.history.push('/home')
            }
        }).catch(e=>{
            if(e.response)
            swal({icon:"error",text:e.response.data})           
            
        })
        
    }
    render() {
        return (
            <div className='login'>
                <div className="login-inner-1">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="login-inner-2">
                    <LoginInputBox 
                        label={"Email"} 
                        resetPassword={""} 
                        name="loginEmail" 
                        value={this.state.loginEmail} 
                        type='text'
                        placeholder='Email'
                        onChange={this.eventHandle}
                    />
                    <LoginInputBox 
                        label={"Password"} 
                        resetPassword={"Forgotten account?"} 
                        name="loginPassword" 
                        value={this.state.loginPassword} 
                        type='password'
                        placeholder='Password'
                        onChange={this.eventHandle}
                    />
                </div>                
                <div className="login-inner-3">
                    <button onClick={()=>{this.submit()}}>Log In</button>
                </div>
            </div>
        )
    }
}

export default withRouter (Login)  
