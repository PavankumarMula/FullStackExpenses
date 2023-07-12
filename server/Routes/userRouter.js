const express=require('express');

const router=express.Router();

const userController=require('../Controller/userController');

//router for adding new user
router.post('/newuser',userController.addUser);

//router for getting info of existing user
router.post('/existinguser',userController.getuser);



module.exports=router;

