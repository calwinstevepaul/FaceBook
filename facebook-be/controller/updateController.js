var model=require('../models')


class updateController{
  async addpost(url,id,description){
    return await model.posts.create({
      userId:id,
      postPhoto:url,
      postDescription:description,

    })
  }

  async updateUserInfo(phone, age, DOB ,userId){
    var x = await model.userInfo.findAll({
      where:{
        userId:userId
    }
    })
    if(x.length === 0){
      return await model.userInfo.create({
        userId:userId,
        phone:phone, 
        age:age, 
        DOB:DOB   
      })
    }
    else{
      return await model.userInfo.update({
        userId:userId,
        phone:phone, 
        age:age, 
        DOB:DOB   
      },
      {
        where: { userId:userId}
      })
    }

  }

  async addlike(userId,postId){
    // console.log(userId,postId)
    return await model.like.create({
      userId:userId,
      postsId:postId
    })
  }

  async removelike(userId,postId){
    // console.log(userId,postId)
    await model.like.destroy({
      where:{
        userId:userId,
        postsId:postId
      }
    })
    return "Deleted"
  }
  async addcomment(userId,postId,comment){
    console.log(userId,postId,comment)
    return await model.comment.create({
      userId:userId,
      postsId:postId,
      comment:comment
    })
  }
  async addfollowers(userId,followerId){
    // console.log(userId,followerId)
    return await model.follower.create({
      userId:userId,
      followerId:followerId
    })
  }
  

  async removefollowers(userId,followerId){
    // console.log(userId,followerId)
    await model.follower.destroy({
      where:{
        userId:userId,
        followerId:followerId
      }
      
    })
    return "Deleted"

  }

  
   
}


module.exports = () => {
    return new updateController();
  };
  