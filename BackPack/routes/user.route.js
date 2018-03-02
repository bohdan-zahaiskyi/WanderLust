// ./BackPack/routes/todo.server.route.js
import express from 'express';
//import controller file
import * as userController from '../controllers/user.controller';
// get an instance of express router
const router = express.Router();

router.get('/',(req,res)=>{
    userController.getUsers().then(users=>{
            res.send(users);
        },
        err=>{reject(err)})
    //res.send(wandersController.getWanders)
});

router.post('/insert', (req, res) => {
    userController.addUser(req, res);
});

export default router;