import mongoose from 'mongoose';
import {Chats, Chatcatalog, Messages} from '../models/chat.model';

export const sth = (req, res) => {
    console.log(Chatcatalog, Chats, Messages);
};

export const latestChats = (req, res) => {
    //get last 20 chats sorted by last message timestamp
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