import mongoose from 'mongoose';
import {Chatcatalog, Messages} from '../models/chat.model';

export const sth = (req, res) => {
    console.log(Chatcatalog, Messages);
};

export const latestChats = (req, res) => {
    const result = [];
    Chatcatalog.find().then(chats => {
        console.log(chats);
        chats.forEach(chat => {
            if(chat.comunicators.indexOf(req.params.email) > -1){
                result.push(chat)
            }
        });
        res.json(result);
    })
};

export const writeMessage = (req, res) => {
    if(chatExist(req.body.member1, req.body.member2)){
        writeMessage();
    }
    else {
        createChat();
        addChatToCatalog();
        createMessage();
    }
};

const createMessage = (chatId, senderId, text) => {

};

const createChat = () => {
};

const addChatToCatalog = () => {

};

const chatExist = (member1, member2) => {

    if(member1)return false;
    else if(member2) return true;

};