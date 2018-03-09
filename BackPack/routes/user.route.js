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

router.put('/confirm', (req, res) => {
    userController.confirmUser(req, res);
});

router.post('/verifyEmail', (req, res) =>{
    userController.verifyEmail(req, res);
});
router.get('/emailExist/:email', (req, res) => {
    userController.emailExist(req, res);
});
router.post('/authenticate', (req, res) => {
    userController.authenticate(req, res);
});

export default router;