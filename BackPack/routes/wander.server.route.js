// ./BackPack/routes/todo.server.route.js
import express from 'express';
//import controller file
import * as wandersController from '../controllers/wanders.server.controller';
// get an instance of express router
const router = express.Router();
router.get('/',(req,res)=>{
      wandersController.getWanders().then(wanders=>{
            res.send(wanders);
      },
      err=>{reject(err)})
      //res.send(wandersController.getWanders)
});
router.post('/create', (req, res) => {
      wandersController.createWander(req, res)
});

router.post('/search', (req, res) => {
    wandersController.searchWanders(req, res)
});

router.post('/my', (req, res) => {
    wandersController.myWanders(req, res)
});

router.post('/comment', (req, res) => {
    wandersController.commentWander(req, res)
});

router.get('/comments/:id', (req, res) => {
    wandersController.getWanderComments(req, res)
});

router.delete('/:id', (req, res)=>{
    wandersController.deleteWander(req, res)
});

router.get('/:id', (req, res) =>{
    wandersController.getWander(req,res)
});

router.put('/update', (req, res) =>{
    wandersController.updateWander(req,res)
});

export default router;