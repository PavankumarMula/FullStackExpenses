const express=require('express');

const router=express.Router();

const userController=require('../Controller/userController');

const {userAuthentication}= require('../middlewares/userAuthentication');

const {getUserDetails}=require('../Controller/userController');

//router for adding new user
router.post('/newuser',userController.addUser);

//router for getting info of existing user
router.post('/existinguser',userController.getuser);

//get user details fro premium details
router.get('/user',userAuthentication,getUserDetails);

// router for forgotten password
router.post('/forgotpassword',(req,res)=>{
    res.json(req.body);
})



module.exports=router;

