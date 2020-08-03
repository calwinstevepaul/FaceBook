const bcrypt =require('bcrypt')
var model=require('../models')


class authcontroller{
    async signup(signupName, signupEmail, signupPassword){
        let hash = await bcrypt.hashSync(signupPassword, 10);
       var x= await model.user.create({
        name: signupName,
        email: signupEmail,
        password: hash,
        profilePic:"http://localhost:9000//uploads/IMAGE-1592981980959.jpg"
        })
        var y = await model.userInfo.create({
            userId:x.dataValues.id,
            phone:"", 
            age:null, 
            DOB:""   
          })
        return x
    }    

    async login(loginName,loginpassword){
        let result=await model.user.findAll({
            where:{
                email:loginName
            }
            
        })
        return(result)
    }
   
}


module.exports = () => {
    return new authcontroller();
  };
  