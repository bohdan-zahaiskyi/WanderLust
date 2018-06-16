import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import Users from '../models/user.model';
import jwt from 'jsonwebtoken';
import Usercomments from '../models/userComment'
import Wandercomments from "../models/comment.model";

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bohdan.zahaiskyi.pi.2014@lpnu.ua",
        pass: "15.08.1997"
    }
});

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        Users.find().then(users => {
                resolve({'success':true,'message':'Wanders fetched successfully', users});
            },
            err => {reject({'success':false,'message':'Some Error'})})
    })
};

export const getUser = (req, res) => {
    Users.findOne({email: req.params.email}, (err, user) => {
        if(err){
            res.error(err);
        }
        else{
            if(user) {
                res.json(user);
            }
            else {
                res.json({
                    success: false,
                    message: "user not found"
                });
            }
        }
    });
};

export const getUserById = (req, res) => {
    Users.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, (err, user) => {
        if(err){
            res.error(err);
        }
        else{
            if(user) {
                res.json(user);
            }
            else {
                res.json({
                    success: false,
                    message: "user not found"
                });
            }
        }
    });
};

export const searchUser = (req,res) => {
    const keyword = req.params.keyword;
    console.log(keyword);
    const result = [];
    Users.find().then(users => {
        users.forEach(user => {
            let userName = user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase();
            if(userName.indexOf(keyword.toLowerCase()) > -1 || user.email.split('@')[0].indexOf(keyword.toLowerCase()) > -1) {
                result.push(user);
            }
        });
        res.json({success: true, result})
    })
};

export const postComment = (req, res) => {
    const newComment = new Usercomments(req.body);
    newComment.save((err, comment) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        comment.save(error => {
            if(error) {
                return res.json({'success':false,'message':error});
            }
            return res.json({'success':true,comment});
        })
    })
};

export const getComments = (req, res) => {
    Usercomments.find({user: req.params.id})
        .then(result => {
            console.log(result);
            res.json({success: true, comments: result});
        })
        .catch(error => {
            res.json({success: false, message: error});
        })
};
export const getUserFriends = (req, res) => {
    let friendsNames = [];
    let friendsArray = null;
    Users.findOne({email: req.params.email}, (err, user) => {
        if(err){
            res.error(err);
        }
        else{
            if(user) {
                friendsNames = user.friends;
            }
            else {
                res.json({
                    success: false,
                    message: "user not found"
                });
            }
        }
        let queryArray = [];
        friendsNames.forEach(function (name) {
            queryArray.push({
                email: name
            })
        });
        console.log("queryArray: ", queryArray);
        Users.find({ $or: queryArray}).then(friendsArrayFromDB => {
            friendsArray = friendsArrayFromDB;
            if(friendsArray){
                res.json(friendsArray);
            }
            else {
                res.json({
                    success: false,
                    message: "Error in server"
                });
            }
        })
    });
};

export const verifyEmail = (req, res) =>{

    const newUser = new Users(req.body);
    newUser.save().then(user =>{
        const link = "http://localhost:4200/verify/" + user._id;
        const mailOptions = {
            to : user.email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        };
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.send("error");
            } else {
                console.log("Message sent: " + response.message);
                res.send("sent verification letter");
            }
        });
    });
};

export const confirmUser = (req, res) => {
    return Users.updateOne({_id: mongoose.Types.ObjectId(req.body.id)}, {confirmed: true}).then(DBresponse =>{
        if(DBresponse.n > 0){
            res.json({success:true, message: "confirmed successfully"});
        }else {
            res.json({success:false, message: "error in confirmation"});
        }

    }).catch(err => {
        res.json({success:false, message: "error in confirmation"});
    })
};

export const emailExist = (req, res) => {
    Users.findOne({email: req.params.email}, (err, user) => {
        if(err){
            res.error(err);
        }
        else{
            if(user) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
    });
};

export const authenticate = (req, res) => {
    let params = req.body;
    Users.findOne({email: params.email}).then(user =>{
        console.log(params.email);
        if(user && params.password === user.password){
            let token = jwt.sign({id: user._id}, 'supersecret', {expiresIn: 43200});
            console.log("before update: ", token);
            Users.findOneAndUpdate( {email: params.email}, { token: token}, {new: true}).then(usr =>{
                res.json({success: true, message: 'logged in successfully', token: usr.token, id: usr._id});
            }).catch(error => {
                console.log("error occured: ", error);
                res.json({success: false, message: 'Server error'});
            });
        }else {
            res.json({success: false, message: 'email or password is incorrect'});
        }
    })
};

export const updateUser = (req, res) => {
    Users.findOneAndUpdate({_id:req.body._id }, req.body, { new:true }).then(user => {
        console.log(user.friends);
        res.json({success: true, user});
    })
        .catch(error => {
            res.json({success: false, message: error});
        })
};

export const deleteFriend = (req, res) => {
    console.log("I am here");
    let params = req.body;
    let newFriends = [];
        Users.findOne({email: params.myEmail}).then(user =>{
        newFriends = user.friends;
        let index = newFriends.indexOf(params.friendEmail);
        if(index > -1){
            newFriends.splice(index, 1);
        }
        else {
            res.json("WTF???");
        }
    }).then( () =>{
        Users.findOneAndUpdate({email: params.myEmail}, { friends: newFriends}, {new: true}).then(user=>{
            res.json(user.friends);
        });
    });
};
