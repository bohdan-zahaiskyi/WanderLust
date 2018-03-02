// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import Wanders from '../models/wander.server.model';

export const getWanders = () => {
  return new Promise((resolve, reject) => {
    Wanders.find().then(wanders => {
      resolve({'success':true,'message':'Wanders fetched successfully', wanders});
    },
    err => {reject({'success':false,'message':'Some Error'})})
  })
};
  /*Wanders.find().exec((err, wanders) => {
  if(err){
    return {'success':false,'message':'Some Error'};
  }
  return {'success':true,'message':'Wanders fetched successfully', wanders};
  });*/

export const addWander = (req,res) => {
  const newWander = new Wander(req.body);
  newWander.save((err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'Wander added successfully', wander});
  })
};
export const updateWander = (req,res) => {
  Wanders.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(wander);
    return res.json({'success':true,'message':'Updated successfully',wander});
  })
};
export const getWander = (req,res) => {
  Wanders.find({_id:req.params.id}).exec((err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    if(wander.length){
        return res.json({'success':true,'message':'Wander fetched by id successfully',wander});
    }
    else{
        return res.json({'success':false,'message':'Wander with the given id not found'});
    }
  })
};
export const deleteWander = (req,res) => {
  Wanders.findByIdAndRemove(req.params.id, (err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'Wander deleted successfully'});
  })
};