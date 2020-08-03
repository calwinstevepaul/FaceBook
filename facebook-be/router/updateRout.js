const router = require("express").Router();
var jwt = require("jsonwebtoken");
var middleware = require('../middlewar/middlewar')
const multer=require('multer');
const path = require("path")

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
  
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});


class update {

    constructor(updatecontroller) {
      this.controller = updatecontroller
      this.init();
    }
  
    init() {
      router.post("/addpost", middleware,upload.single("myimage"), (req, res) =>{
        var token=(req.headers.token)
        var description =req.body.description
        let str=req.file.path
        // REMOVING PUBLIC FROM THE PATH AS IT IS STATIC
        let newstr=str.slice(6)
       
        var url ="http://localhost:9000/"+newstr
        var id =req.user
        // console.log(id, url, description)
        this.controller.addpost(
          url,
          id,
          description
        ).then(result => {
          res.send(result);
        });
        
    })




      router.post("/userinfo",middleware,(req, res) => {
        const { phone, age, dob } = req.body;
        const id = req.user
        
        this.controller.updateUserInfo(
          phone, age, dob ,id
        ).then(result=>{
          res.send({ success: true,result})
        })      
        
        
      });

      router.post("/addlike",middleware,(req,res)=>{
        var userId =req.user
        var postId = req.body.postId 
        this.controller.addlike(
          userId,
          postId
        ).then(result => {
          // console.log("resultAdd", result)
          res.send(result);
        });
       
      })

      router.post("/removelike",middleware,(req,res)=>{
        var userId = req.user
        var postId = req.body.postId 
        this.controller.removelike(
          userId,
          postId
        ).then(result => {
          // console.log("result",result)
          res.send(result);
        });
      })

      router.post("/addcomment",middleware,(req,res)=>{
        var userId =req.user
        var postId = req.body.postId 
        var comment = req.body.comment
        this.controller.addcomment(
          userId,
          postId,
          comment
        ).then(result => {
          // console.log("result",result)
          res.send(result);
        });
      })

      router.post("/addfollowers",middleware,(req,res)=>{
        var userId = req.user
        var followerId = req.body.followerId 
        // console.log(userId,followerId)

        this.controller.addfollowers(
          userId,
          followerId
        ).then(result => {
          // console.log("addfollowers", result)
          res.send(result);
        
        })
      })
  
  
      router.post("/removefollowers",middleware,(req,res)=>{
        var userId = req.user
        var followerId = req.body.followerId 

        console.log(userId,followerId)
        this.controller.removefollowers(
          userId,
          followerId
        ).then(result => {
          // console.log("removefollowers", result)
          res.send(result);
        });
        
      }) 

      
      
     
    }
  
    getRouter() {
      return router;
    }
  }
  
  module.exports = controller => {
    return new update(controller);
  };
  