// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import Users from '../models/user.model';

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        Users.find().then(users => {
                resolve({'success':true,'message':'Wanders fetched successfully', users});
            },
            err => {reject({'success':false,'message':'Some Error'})})
    })
};

export const addUser = (req,res) => {
    const newUser = new Users(req.body);
    console.log(newUser);
    newUser.save((err, user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        return res.json({'success':true,'message':'User added successfully', user});
    })
};
export const updateUser = (req,res) => {
    Users.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error','error':err});
        }
        console.log(user);
        return res.json({'success':true,'message':'Updated successfully',user});
    })
};
export const getUser = (req,res) => {
    Users.find({_id:req.params.id}).exec((err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        if(user.length){
            return res.json({'success':true,'message':'Wander fetched by id successfully',user});
        }
        else{
            return res.json({'success':false,'message':'Wander with the given id not found'});
        }
    })
};
export const deleteUser = (req,res) => {
    Users.findByIdAndRemove(req.params.id, (err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        return res.json({'success':true,'message':'Wander deleted successfully'});
    })
};