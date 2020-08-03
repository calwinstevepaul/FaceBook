import React, { Component } from 'react'
import {authApi} from '../../apiCall'
import Dropdown from './Dropdown'


export class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isSearch:false,
             currentUser:{},
             otherUsers:[] 
        }
    }
    componentDidMount(){
        this.getUserInfo()
    
       }

    getUserInfo=()=>{
        authApi.post("getdata/userinfo",{}).then((res)=>{
            console.log(res)
            this.setState({
                currentUser:res.data.result[0].user
            })
        })
    }
    logout=()=>{
        this.props.changeLoginState(false)
        localStorage.clear();

    }

    handelChange=(e)=>{
        let key= e.target.value
        authApi.post("/getdata/otherusers",{
            key:key
        }).then(res=>{
            this.setState({
                otherUsers:res.data
            })
        })
    }

    render() {
        return (
            <div className="navbar">
               
                <div className="navbar-inner-1">
                    <div className="logo">
                        <i class="fab fa-facebook"></i>                  
                    </div>
                    <div className="navbar-search">
                        <input placeholder="Search Facebook" onChange={(e)=>this.handelChange(e)} onFocus={()=>this.setState({isSearch:true})}/>
                        {this.state.isSearch 
                            ?
                                <>
                                    <div className="close" onClick={()=>this.setState({isSearch:false})}>

                                    </div>
                                    <div className="dropdown" >
                                        {this.state.otherUsers.map(data => {
                                            return <Dropdown data={data} currentUser={this.state.currentUser.id} />
                                        })}
                                    </div>
                                </>
                            :   
                                <>
                                </>
                        }
                    </div>
                </div>
                <div className="navbar-inner-2">
                   
                        <button onClick={()=>this.props.changePage(1)}>
                            <i class="fas fa-home"></i>
                        </button>       
                        <button onClick={()=>this.props.changePage(2)}>
                            <i class="fas fa-pen"></i>
                        </button>    
                        <button onClick={()=>this.props.changePage(3)}>
                            <i class="fas fa-plus"></i>
                        </button>             
                </div>
                <div className="navbar-inner-3">
                    <button onClick={()=>{this.logout()}}>Log Out</button>
                </div>
            </div>
        )
    }
}

export default Navbar
