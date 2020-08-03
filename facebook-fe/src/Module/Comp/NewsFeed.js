import React, { Component } from 'react'
import Post from './Post'
import {authApi} from '../../apiCall'


export class NewsFeed extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            postData:[],
            currentUser:{}
             
        }
    }
    componentDidMount(){
        this.getpost()
        this.getUserInfo()
    }
    getUserInfo=()=>{
        authApi.post("getdata/userinfo",{}).then((res)=>{
            this.setState({
                currentUser:res.data.result[0].user
            })
        })
    }
    
    getpost=()=>{
        authApi.post("/getdata/posts", {}).then((res)=>{
            console.log(res.data)
            this.setState({
                postData:res.data
            })

        })
    }
    render() {
        return (
            <div className="newsfeed">
               {this.state.postData.map((data)=>{
                   return<Post data={data} currentUser={this.state.currentUser} getpost={this.getpost}/>
               })}
            </div>
        )
    }
}

export default NewsFeed
