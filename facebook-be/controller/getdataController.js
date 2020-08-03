var model=require('../models')
let Op=require('sequelize').Op


class getdataController{
    async getUserInfo(userId){
      return await model.userInfo.findAll({
        where:{
          userId:userId
        },
        include:[{
          model:model.user
        }]
      })
    }

    async posts(id){  
      let followings=await model.follower.findAll({ attributes:['followerId'],raw:true,
        where:{
            userId:id
        },            
      })
      let x=[id]
        
      followings.map(value=>{
          x.push(value.followerId)
      })
      return await model.posts.findAll({
          order:[["createdAt","DESC"]],  
          where:{
            userId:x                
          },               
          include:[
            {
              model:model.user
            },
           {
             model:model.like,             
           },
           {
            model:model.comment,
            include:[{
                model:model.user,
                attributes:['name','profilePic']
            }]
          },
            
          ]
          
      })
  }




  async otherusers(key){
    return await model.user.findAll({
        where:{
            name:{
                [Op.iLike]:key+'%'
            }    
        }
    })
  }


  async getFollowers(id){
    let followings=await model.follower.findAll({ attributes:['followerId'],raw:true,
        where:{
            userId:id
        },            
    })
    let x=[]
        
    followings.map(value=>{
        x.push(value.followerId)
    })
    return x
  }
   
}


module.exports = () => {
    return new getdataController();
  };
  