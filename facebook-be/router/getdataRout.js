const router = require("express").Router();
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");
var middleware = require('../middlewar/middlewar')



class getData {

  constructor(getdatacontroller) {

    this.controller = getdatacontroller
    this.init();
  }

  init() {
    router.post("/userinfo",middleware,(req, res) => {

      const id = req.user        
      this.controller.getUserInfo(
        id
      ).then(result=>{
        // console.log(result[0].dataValues)
        res.send({ success: true,result})
      })      
      
      
    });



    router.post("/posts",middleware,(req,res)=>{
      var id =req.user

      this.controller.posts(
          id            
        ).then(result => {
          res.send(result);
        });        
    })

    router.post("/otherusers",middleware,(req,res)=>{
      var key=req.body.key
        this.controller.otherusers(
            key
          ).then(result => {
            res.send(result);
          });
    })

    router.post("/followers",middleware,(req,res)=>{
      var id =req.user
      this.controller.getFollowers(id).then(result=>{
        res.send(result)
      })


    })
  

  }

  getRouter() {
    return router;
  }
}
  
module.exports = controller => {
  return new getData(controller);
};
  