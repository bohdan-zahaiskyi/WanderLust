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

router.get('/:id', (req, res) => {
    userController.getUserById(req,res);
});

router.put('/confirm', (req, res) => {
    userController.confirmUser(req, res);
});

router.get('/comments/:id', (req, res) => {
    userController.getComments(req, res);
});

router.post('/comment', (req, res) => {
    userController.postComment(req, res);
});

router.get('/search/:keyword', (req,res) => {
    userController.searchUser(req,res)
});

router.put('/update', (req, res) => {
    userController.updateUser(req, res);
});

router.put('/deleteFriend', (req, res) => {
    userController.deleteFriend(req, res);
});

router.post('/verifyEmail', (req, res) =>{
    userController.verifyEmail(req, res);
});
router.get('/emailExist/:email', (req, res) => {
    userController.emailExist(req, res);
});
    router.get('/email/:email', (req, res) =>{
    userController.getUser(req, res);
});
router.get('/:email/friends', (req, res) =>{
    userController.getUserFriends(req, res);
});
router.post('/authenticate', (req, res) => {
    userController.authenticate(req, res);
});

export default router;