import React, { Component } from 'react'
import {authApi} from '../../apiCall'


export class Dropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             followerId:[]
        }
    }
    
    componentDidMount(){
        this.getfollowers()        
    }
    getfollowers = () => {
        authApi.post("/getdata/followers").then((res)=>{
            // console.log(res)
            this.setState({
                followerId:res.data
            })
        })
    }
    addfollowers = id => {
        authApi.post("/update/addfollowers", {
            followerId: id
        })
        .then(()=>this.getfollowers())
    };
    removefollowers = id => {
        authApi.post("/update/removefollowers",{ 
            followerId: id 
        })
        .then(()=>this.getfollowers())

    };


    render() {
        var isFollow =false
        this.state.followerId.map(x=>{
            if(x === this.props.data.id){
                isFollow=true
            }
        })

        if(this.props.data.id !== this.props.currentUser)
        return (        
            <div className="dropdown-inner">
                <img src={this.props.data.profilePic} alt="logo" height="40px"/>            
                <div>{this.props.data.name}</div>
                {isFollow
                ?
                    <button onClick={()=>this.removefollowers(this.props.data.id)}>Unfriend</button>
                :
                    <button onClick={()=>this.addfollowers(this.props.data.id)}>+ Add Friend</button>
                }
                </div>
        )
        else
        return(
        <>
        </>
        )
    }
}

export default Dropdown

