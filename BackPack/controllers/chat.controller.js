import mongoose from 'mongoose';
import {Chatcatalogs, Messages} from '../models/chat.model';
import Users from '../models/user.model';
export const sth = (req, res) => {
    console.log(Chatcatalogs);
};

export const latestChats = (req, res) => {
    const result = [];
    Chatcatalogs.find().then(chats => {
        console.log(chats);
        chats.forEach(chat => {
            if(chat.comunicators.indexOf(req.params.email) > -1){
                result.push(chat)
            }
        });
        res.json(result);
    })
};

export const getChatMessages = (req, res) => {
    Messages.find({chatId: req.params.chatId}).then(response => {
        res.json(response);
    })
};

export const writeMessage = (req, res) => {
    Chatcatalogs.find({_id: mongoose.Types.ObjectId(req.params.chatId)}).then(chats => {
        if(chats.length > 0) {
            Messages.create(req.body).then(() => {
                res.json({success: true});
            }).catch(error => {
                    res.json({success: false, message: error})
                });
        }
        else {res.json({success: false})}
    });
};

export const getChatInterlocutor = (req, res) => {
    Chatcatalogs.find({_id: mongoose.Types.ObjectId(req.params.chatId)}).then(chats => {
        const chat = chats[0] || undefined;
        if(chat) {
            let email = chat.comunicators[0] !== req.params.email? chat.comunicators[0] : chat.comunicators[1];
            Users.find({email: email}).then(user => {
                res.json(user[0]);
            }).catch(error => res.json({error}));
        }else {
            res.json({success: 'false'});
        }
    })
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