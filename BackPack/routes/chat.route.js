// ./BackPack/routes/todo.server.route.js
import express from 'express';

//import controller file
import * as chatController from '../controllers/chat.controller';
// get an instance of express router
const router = express.Router();

router.get('/',(req,res)=>{
    chatController.sth(req, res);
});
router.get('/:email', (req, res) => {
    chatController.latestChats(req, res);
    });

router.get('/messages/:chatId', (req, res) => {
    chatController.getChatMessages(req, res);
});

router.get('/interlocutor/:chatId/:email', (req, res) => {
    chatController.getChatInterlocutor(req, res);
});

router.post('/message/:chatId', (req,res) => {
    chatController.writeMessage(req, res);
});

export default router;