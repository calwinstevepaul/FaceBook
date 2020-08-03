import React, { Component } from 'react'
import {authApi} from '../../apiCall'


export class AddPost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            postPic:[],
            caption:""
        }
    }


    submit=()=>{
        const formdata=new FormData();
        formdata.append("myimage",this.state.postPic);
        formdata.append("description",this.state.caption);
        let config={
            headers: {
                'content-type': 'multipart/form-data',
        
            }
        }
        authApi.post("/update/addpost",formdata,config)
        .then(res=>{
            console.log("image",res.data);

        })
    }
    
    render() {
        return (
            <div className="info">
                <div className="info-inner"> 
                    <div className="info-display">
                        <label>Photo</label>
                        <input type= "file"  onChange={(e)=>{this.setState({postPic:e.target.files[0]})}} />

                        <label>caption</label>
                        <input type= "text" placeholder="caption" value={this.state.caption}  onChange={(e)=>{this.setState({caption:e.target.value})}} />

                        
                        <button onClick={(e)=>{this.submit(e)}}>Add Post</button>

                    </div>
                    
                </div>

            </div>
              
        )
    }
}

export default AddPost
