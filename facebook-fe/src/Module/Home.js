import React, { Component } from 'react'
import Navbar from './Comp/Navbar'
import './Home.css'
import NewsFeed from './Comp/NewsFeed'
import Info from './Comp/Info'
import AddPost from './Comp/AddPost'

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             page:1
        }
    }
    changePage=(value)=>{
        this.setState({
            page:value
        })
    }
    renderSwitch(param) {
        switch(param) {
          case 1:return <NewsFeed/>
          case 2:return <Info/>
          case 3:return <AddPost/>
          default:return <NewsFeed/>
        }
      }
    
    render() {
        return (
            <div className="home">
                <Navbar changePage={this.changePage} {...this.props}/>  
                <div className="body">
                    {this.renderSwitch(this.state.page)}
                </div>                            
            </div>
        )
    }
}

export default Home
