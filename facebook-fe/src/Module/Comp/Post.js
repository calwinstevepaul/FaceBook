import React, { Component } from 'react'
import {authApi} from '../../apiCall'

class Post extends Component {
   constructor(props) {
       super(props)
   
       this.state = {
            comments:""
       }
   }

   submit=(id)=>{
    authApi.post("/update/addcomment",{ 
        postId: id, 
        comment:this.state.comments 
    })
    .then(() => {
      this.props.getpost();
      this.setState({comments:''})
    })
       
   }
    
    
    addlike = id => {
        console.log(id)
        authApi.post("/update/addlike", { postId: id })
            .then(() => {
            this.props.getpost();
        });
    };
    removelike = id => {
        authApi.post("/update/removelike", { postId: id })
            .then(() => {
            this.props.getpost();
        });
    };
    
    render() {
        var like =false
        this.props.data.likes.map(x=>{
            if(x.userId === this.props.currentUser.id){
                like=true
            }
        })
        return (
            <div className="post">
                <div className="post-1">
                    <div className="post-1-1">
                        <img src={this.props.data.user.profilePic} height="40px" width="40px"/>
                        <div>
                            {this.props.data.user.name}
                            <p className="post-time">{new Date(this.props.data.createdAt).toDateString()}</p>

                        </div>
                    </div>
                    <div><i class="fas fa-ellipsis-h"></i></div>
                </div>
                <div className="post-2">
                    {this.props.data.postDescription}
                </div>
                <div>
                    <img src={this.props.data.postPhoto} width="100%"/>
                </div>
                <div className="post-4">
                    {this.props.data.likes.length} {this.props.data.likes.length <= 1 ? "like":"likes"}
                </div>
                <div className="post-5" >
                        {like?
                            <button onClick={()=>this.removelike(this.props.data.id)}>
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                        :
                            <button onClick={()=>this.addlike(this.props.data.id)}>
                                <i class="far fa-thumbs-up"></i>
                            </button>
                        }
                    <button>
                        <i class="fas fa-comments"></i>
                    </button>
                    <button>
                        <i class="fas fa-share-alt"></i>
                    </button>

                </div>
                <div className="post-6">
                    {this.props.data.comments.map((data)=>{
                        return(
                            <div className="post-6-1">
                                <div className="post-6-1-1">
                                    <img src={data.user.profilePic} alt="logo" height="35px"/>
                                </div>
                                <div className="post-6-1-2">
                                    <p>{data.user.name}</p>
                                    {data.comment}
                                </div>
                            </div>   
                        )
                    })}

                </div>
                <div className="post-7">
                        <input 
                            className="post-comment" 
                            placeholder="Write a comment ....." 
                            value={this.state.comments} 
                            onChange={(e)=>{this.setState({comments:e.target.value})}} 
                        />

                        <button onClick={()=>this.submit(this.props.data.id)}>
                            Post 
                        </button>
                </div> 
                
            </div>
        )
    }
}

export default Post
