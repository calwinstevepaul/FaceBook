import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import swal from 'sweetalert'


export class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
             editInfo:false,
             phone:null,
             age:null,
             dob:"",
             userInfo:{},
             currentUser:{}
        }
    }
   componentDidMount(){
    this.getUserInfo()

   }
    getUserInfo=()=>{
        authApi.post("getdata/userinfo",{}).then((res)=>{
            console.log(res)
            this.setState({
                userInfo:res.data.result[0],
                currentUser:res.data.result[0].user
            })
        }).catch(e=>{
            swal({text : "Error Getting User Info", icon: "error"})

        })
    }
    eventHandle=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }  

    submit=(e)=>{
        e.preventDefault();
        authApi.post("/update/userinfo",{
            phone:this.state.phone.toString(),
            age:this.state.age,
            dob:this.state.dob
        }).then((res)=>{
            if(res.data.success){
                swal({text : "User Info Updated", icon: "success"})
            }
            this.getUserInfo()

        }).catch(e=>{
            swal({text : "Error Updating User Info", icon: "error"})

        })
    }
    
    render() {
        return (
            <div className="info">
                <div className="info-inner">   
                    <button onClick={()=>{this.setState({editInfo:!this.state.editInfo})}}>{this.state.editInfo?"Back":"Edit"} {this.state.editInfo?<></>:<i class="fas fa-pen"></i>}</button>
                    {this.state.editInfo 
                        ?
                            <div> 
                                <form className="info-edit" onSubmit={(e)=>{this.submit(e)}}>
                                    <label>Phone Number</label>
                                    <input type= "number" placeholder="Phone Number" name="phone" value={this.state.phone} onChange={(e)=>this.eventHandle(e)}/>

                                    <label>Age</label>
                                    <input type= "number" placeholder="age" name="age" value={this.state.age} onChange={(e)=>this.eventHandle(e)} />

                                    <label>Date of Birth </label>
                                    <input type= "date" placeholder="age" name="dob" value={this.state.dob} onChange={(e)=>this.eventHandle(e)} />
                                    <button type="submit">change</button>

                                </form>
                                
                            </div>
                        :
                            <div className="info-display"> 
                                <h3>Personal Info:</h3>
                               <p> Name: {this.state.currentUser.name}</p>
                               <p> Email: {this.state.currentUser.email}</p>
                               <p> Phone: {this.state.userInfo.phone}</p>
                               <p> Age: {this.state.userInfo.age}</p>
                               <p> DOB: {this.state.userInfo.DOB}</p>



                            </div>
                    }
                    
                </div>

            </div>

        )
    }
}

export default Info
