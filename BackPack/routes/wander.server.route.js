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
/*router.post('/')
     .post(wandersController.
)
     .put(wandersController.updateWander);*/
router.route('/:id')
      .get(wandersController.getWander)
      .delete(wandersController.deleteWander);
export default router;