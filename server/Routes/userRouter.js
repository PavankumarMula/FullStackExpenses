const express=require('express');

const router=express.Router();

const userController=require('../Controller/userController');

const {userAuthentication}= require('../middlewares/userAuthentication');

const {getUserDetails}=require('../Controller/userController');

const {forgotPassword,resetPassword} = require('../Controller/passwordController');


//router for adding new user
router.post('/newuser',userController.addUser);

//router for getting info of existing user
router.post('/existinguser',userController.getuser);

//get user details fro premium details
router.get('/user',userAuthentication,getUserDetails);

// router for forgotten password link
router.post('/forgotpassword',forgotPassword);

//router for resetting the password
router.post('/forgotPassword/:id',resetPassword);



module.exports=router;

