import React, { Component } from 'react'
import SignupInputBox from '../../ReusableComp/SignupInputBox'
import {plainApi} from '../../../apiCall'
import swal from 'sweetalert'



export class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            signupName:"",
            signupEmail:"",
            signupPassword:""             
        }
    }
    eventHandle=(e)=>{
        let value = e.target.value
        if (e.target.name === "signupEmail") {
            value = e.target.value.toLowerCase();
        }
        this.setState({
            [e.target.name]: value
        })
    }  
    
    submit=()=>{
        plainApi.post("/auth/signup",{
            signupName:this.state.signupName,
            signupEmail:this.state.signupEmail,
            signupPassword:this.state.signupPassword      
        }).then((res)=>{
            if(res.data.success){
                swal({text : "Sign up Successful!!!", icon: "success"})
            }
        }).catch(e=>{
            swal({text : "Sign up not Successful", icon: "error"})

        })
        
    }

    render() {
        return (
            <div className='signup'>
                <div className="signup-inner-1">
                    <p className="signup-inner-1-1">Create a new account</p>
                    <p className="signup-inner-1-2">It's quick and easy.</p>
                </div>
                
                <div className="signup-inner-2">
                    <SignupInputBox                    
                        name="signupName" 
                        value={this.state.signupName} 
                        type='text'
                        placeholder='Name'
                        onChange={this.eventHandle}
                    />
                    <SignupInputBox                    
                        name="signupEmail" 
                        value={this.state.signupEmail} 
                        type='email'
                        placeholder='Email'
                        onChange={this.eventHandle}
                    />
                    <SignupInputBox                    
                        name="signupPassword" 
                        value={this.state.signupPassword} 
                        type='password'
                        placeholder='Password'
                        onChange={this.eventHandle}
                    />
                </div>
                <div className="signup-inner-3">
                    <button className="signup-button"  onClick={()=>{this.submit()}}>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default Signup
