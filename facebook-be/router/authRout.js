const router = require("express").Router();
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");


class auth {

    constructor(authcontroller) {
      this.controller = authcontroller
      this.init();
    }
  
    init() {
      router.post("/signup",(req, res) => {
        const { signupName, signupEmail, signupPassword } = req.body;
        this.controller.signup(
            signupName,
            signupEmail,
            signupPassword
        ).then(result=>{
            // console.log(result)
            res.send({ success: true,result})
        })
        .catch((e)=>{
            res.status(400).send({errMsg: "signup error"})

        })
        
      });
  
      router.post('/login',(req,res)=>{
        const {loginName,loginPassword}= req.body;
        this.controller.login(
          loginName,
          loginPassword
        ).then((result)=>{
            if (result.length == 0) {
                res.status(400).send("invalid user");
                console.log("invalid user");
              } else {
                var passwordDB = result[0].dataValues.password;
                bcrypt.compare(loginPassword, passwordDB, function(err, re) {
                  if (re == true) {
                    var token = jwt.sign(
                      { id: result[0].dataValues.id },
                      "calwin123",
                      { expiresIn: "1h" }
                    );
        
                    res.status(200).send({
                      name:result[0].dataValues.name,
                      id:result[0].dataValues.id,
                      token: token,
                      message: "login successful"
                    });
        
                  } 
                  else {
                    res.status(400).send("wrong password");
                    console.log("wrong password");
                  }
                });
              }
        })
        
      })

     


      
    }
    
  
    getRouter() {
      return router;
    }
  }
  
  module.exports = controller => {
    return new auth(controller);
  };
  